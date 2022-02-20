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
    function beforeSubmit(context) {
		var newRecord = context.newRecord;
		
		var employee = newRecord.getValue('employee');
		
		var supervisor = newRecord.getValue('custbody_aca_supervisor');
		
		if (supervisor == '' && employee != ''){
			var mRecord = record.load({
				type: record.Type.EMPLOYEE,
				id: employee,
				isDynamic: true,
			});
			
			var empSupervisor = mRecord.getValue('supervisor');
			
			newRecord.setValue('custbody_aca_supervisor', empSupervisor);
		}
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
		
    }
	
    return {
        // beforeLoad: beforeLoad,
       beforeSubmit: beforeSubmit,
       // afterSubmit: afterSubmit
    };
    
});
