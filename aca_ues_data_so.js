/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

/*
 * Note
 * TaxAmount masih belum bisa dihilangkan
 */
define(['N/record', 'N/ui/serverWidget', 'N/runtime'],

function(record, serverWidget, runtime) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(context) {
		
    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(context) {
		var newRecord = context.newRecord;
		
		var ID = newRecord.id;
		
		if (context.type === context.UserEventType.CREATE){
			var mRecord = record.load({
				type: record.Type.SALES_ORDER,
				id: ID,
				isDynamic: true,
			});
			
			var tranid = mRecord.getText('tranid');
			log.debug('tranid', tranid);
			mRecord.setValue('custbody_aca_mir_so_number', tranid);
			
			var subsidiary = mRecord.getValue('subsidiary');
			
			if (subsidiary != ''){
				var mSubsidiary = record.load({
					type: record.Type.SUBSIDIARY,
					id: subsidiary,
					isDynamic: true,
				});
				
				var mainAddress = mSubsidiary.getValue('mainaddress_text');
				
				mRecord.setValue('custbody_aca_sub_main_address', mainAddress);
			}
			
			var bankIntruction = newRecord.getValue('custbody_aca_bank_details');
			var department = newRecord.getValue('department');
			
			if (bankIntruction == ''){
				if (department != ''){
					var mDept = record.load({
						type: record.Type.DEPARTMENT,
						id: department,
						isDynamic: true,
					});
					
					var bankInst = mDept.getValue('custrecord_aca_bank_intructions');
					
					mRecord.setValue('custrecord_aca_bank_details', bankInst);
				}
			}
			
			mRecord.save();
		}
    }
	
    return {
        // beforeLoad: beforeLoad,
       // beforeSubmit: beforeSubmit,
       afterSubmit: afterSubmit
    };
    
});
