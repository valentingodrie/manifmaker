import {SelectComponent} from "./SelectComponent"

export class MultipleSelectComponent extends SelectComponent {

        checkItemPath() {
            //in another method to have a context alone for reactivity

            var item = this._getObjectUpdateCollection().findOne(this.updateItemId);
            if (!item)
                throw new Meteor.Error(`${this.constructor.name} : could not find ${this.updateItemId} in collection ${this.updateCollection}`);


            //is it an array ?
            //try {
            //    if (!Array.isArray(Schemas[this.updateCollection].pick([this.updateItemPath, this.updateItemPath+".$"])._schema[this.updateItemPath].type())) {
            //        throw new Meteor.Error(`${this.constructor.name} : path ${this.updateItemPath} should refers to an array`);
            //    }
            //} catch(TypeError){
            //    throw new Meteor.Error(`${this.constructor.name} : path ${this.updateItemPath} should refers to an array`);
            //}

            //is it an array  of Mongodb id ?
            if(this.quickSelectIds){
                if(!Array.isArray(this.quickSelectIds))
                    throw new Meteor.Error(`${this.constructor.name}  : this.quickSelectIds should be an array. Given : ${this.quickSelectIds}`);

                _.each(this.quickSelectIds,_id => {
                    if(_id.match( SimpleSchema.RegEx.Id )[0] !== _id)
                        throw new Meteor.Error(`${this.constructor.name}  : this.quickSelectIds an array of MongoDB id (should match ${SimpleSchema.RegEx.Id}). Given : ${this.quickSelectIds}`);
                });
            }
        }

        template() {
            return 'selectComponent';
        }

        collectionSelectedItems() {
            return this.optionCollection.find({
                _id: {
                    $in: this.optionsToUpdate()
                }
            });
        }

        isChecked() {
            var isChecked = (this.optionsToUpdate().indexOf(this.currentData()._id) !== -1) ? true : false;

            if (this.isRenderedBoolean) {
                //checkbox need to be updated by jQuery and not DOM. DOM can only be used to init checkbox state
                //a trick to find the dom of the popover, not very strong
                this.$(`.custom-select-label-wrapper[data-popover]`).parent().find(".popover .popover-content li input#" + this.currentData()._id).prop('checked', isChecked);
            }
            //still need DOM data for re-creating popover each time it is displayed
            return (isChecked) ? "checked" : "";
        }

        quickSelect() {
            this.updateOption(this.quickSelectIds);
        }

        onCheckboxOptionsChange(e) {
            var cb = $(e.target);
            var _id = cb.attr("id");

            if (cb.is(":checked"))
                this.addOption(_id);
            else
                this.removeOption(_id);
        }

        addOption(addedOptionId) {
            var optionsToUpdate = this.optionsToUpdate();
            optionsToUpdate.push(addedOptionId);
            this.updateOption(optionsToUpdate);
        }

        removeOption(removedOptionId) {
            var optionsToUpdate = this.optionsToUpdate();
            optionsToUpdate = _.without(optionsToUpdate, removedOptionId);
            this.updateOption(optionsToUpdate);
        }
    }

MultipleSelectComponent.register('MultipleSelectComponent');