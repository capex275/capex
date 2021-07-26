odoo.define('web_lone_calculator.calc', function (require) {
'use strict';

function ManageLoanViewModel()
{
    var self = this;
    self.installmentsTable = ko.observableArray();
    self.installmentsTableTemp  = ko.observableArray();
    self.loan_amount = ko.observable();
    self.table_visible = ko.observable(false);
    self.no_of_months = ko.observable(12);
    self.corridor_rate = ko.observable(0.1425);
    self.lending_rate = ko.observable(0);
    self.install_per = ko.observable(0.088927);
    self.interest_rate = ko.observable();
    self.install_value = ko.observable();
    self.total = ko.observable();
    self.net_interest = ko.observable();

    $('input[type=radio][name=x_studio_lease_payment_type]').change(function() {
    if (this.value === 'In Advance') {
        self.getInstallPer(self.interest_rate(),self.no_of_months(),'A');
    }
    else{
        self.getInstallPer(self.interest_rate(),self.no_of_months(),'R');
    }
        self.installmentsTable([]);
         self.installmentsTableTemp([]);
         self.interest_rate(self.corridor_rate() + self.lending_rate());
         if(self.loan_amount() !== ""){
         if(self.loan_amount() !== 0 && self.no_of_months() !== 0){
            self.loanCalculator();
             self.table_visible(true);
         } else{
             self.table_visible(false);
         }}
    });
    self.amountChanged = function(){
        var loan_amount = document.getElementById("ic03st4dfhj").value;
         self.loan_amount(loan_amount);
         self.installmentsTable([]);
         self.installmentsTableTemp([]);
         self.interest_rate(self.corridor_rate() + self.lending_rate());
         var leaseTypeText = $('input[name=x_studio_lease_payment_type]:checked').val();
         var leaseType = 'A';
         if(leaseTypeText === 'In Advance' ){
             leaseType = 'A';
         }else{
             leaseType = 'R';
         }
         self.getInstallPer(self.interest_rate(),self.no_of_months(),leaseType);
         if(loan_amount !== ""){
            if( ( self.loan_amount() !== undefined || self.loan_amount() !== 0 ) && ( self.no_of_months() !== undefined || self.no_of_months() !== 0 )){
            self.loanCalculator();
            self.table_visible(true);
         } else{
             self.table_visible(false);
         }
         }else{
             self.table_visible(false);
         }

    }

    self.getInstallPer = function(interestRate,loanYears,loanType){
        loanYears = loanYears / 12;
        if (interestRate == 0.1425 && loanYears == 1 && loanType == 'A'){
            self.install_per(0.088927);
        }else if(interestRate == 0.1425 && loanYears == 2 && loanType == 'A'){
            self.install_per(0.047651);
        }else if(interestRate == 0.1425 && loanYears == 3 && loanType == 'A'){
            self.install_per(0.033986);
        }else if(interestRate == 0.1425 && loanYears == 4 && loanType == 'A'){
            self.install_per(0.027224);
        }else if(interestRate == 0.1425 && loanYears == 5 && loanType == 'A'){
            self.install_per(0.023222);
        }else if(interestRate == 0.1425 && loanYears == 6 && loanType == 'A'){
            self.install_per(0.020598);
        }else if(interestRate == 0.1425 && loanYears == 7 && loanType == 'A'){
            self.install_per(0.018762);
        }else if(interestRate == 0.1425 && loanYears == 1 && loanType == 'R'){
            self.install_per(0.089998);
        }else if(interestRate == 0.1425 && loanYears == 2 && loanType == 'R'){
            self.install_per(0.048225);
        }else if(interestRate == 0.1425 && loanYears == 3 && loanType == 'R'){
            self.install_per(0.034396);
        }else if(interestRate == 0.1425 && loanYears == 4 && loanType == 'R'){
            self.install_per(0.027552);
        }else if(interestRate == 0.1425 && loanYears == 5 && loanType == 'R'){
            self.install_per(0.023501);
        }else if(interestRate == 0.1425 && loanYears == 6 && loanType == 'R'){
            self.install_per(0.020846);
        }else if(interestRate == 0.1425 && loanYears == 7 && loanType == 'R'){
            self.install_per(0.018988);
        }

    }
    self.yearsChanged = function (event) {
        var months = document.getElementById("z60gz21yqg9").value - 3;
        self.no_of_months(months * 12);
        var leaseTypeText = $('input[name=x_studio_lease_payment_type]:checked').val();
         var leaseType = 'A';
         if(leaseTypeText === 'In Advance' ){
             leaseType = 'A';
         }else{
             leaseType = 'R';
         }
         self.getInstallPer(self.interest_rate(),self.no_of_months(),leaseType);
        self.installmentsTable([]);
        self.installmentsTableTemp([]);
        if(self.loan_amount() !== ""){
        if(self.loan_amount() !== 0 && self.no_of_months() !== 0){
            self.loanCalculator();
             self.table_visible(true);
         } else{
             self.table_visible(false);
         }
        }
    }


    self.loanCalculator = function(){
        self.interest_rate(self.corridor_rate() + self.lending_rate());
        self.install_value(self.loan_amount() *  self.install_per());
        self.total(self.install_value() * self.no_of_months());
        self.net_interest(self.total() -  self.loan_amount());
        var begin_balance_temp = self.loan_amount();
        //var end_balance_temp = 0;
        for (let i = 1; i <= self.no_of_months(); i++) {
            var item = {
                monthIndex: ko.observable('M' + i),
                begin_balance:ko.observable(begin_balance_temp),
    	        install_value:ko.observable(self.install_value()),
                interest_balance_per:ko.observable(0),
                interest_value:ko.observable(0),
                interest_balance_per_final:ko.observable(0),
                principal_value:ko.observable(0),
                ending_balance:ko.observable(0),
                total_install:ko.observable(0),
                days_interest:ko.observable(0),
                final_days_interest:ko.observable(0),
                no_of_days:ko.observable(0),
                actual_year_days:ko.observable(360),
            }
            switch(i) {
             case 1:
                item.no_of_days(27.7460);
             break;
             case 2:
                item.no_of_days(27.5200);
             break;
             case 3:
                item.no_of_days(27.2450);
             break;
             case 4:
                item.no_of_days(26.9060);
             break;
             case 5:
                item.no_of_days(26.4900);
             break;
             case 6:
                item.no_of_days(25.9450);
             break;
             case 7:
                item.no_of_days(25.2205);
             break;
             case 8:
                item.no_of_days(24.2200);
             break;
             case 9:
                item.no_of_days(22.7000);
             break;
             case 10:
                item.no_of_days(20.1800);
             break;
             case 11:
                item.no_of_days(14.7782);
             break;
             case 12:
                item.no_of_days(0.0000);
             break;
            }
            item.days_interest(item.no_of_days() / item.actual_year_days() );
            item.final_days_interest(self.interest_rate() * item.days_interest() );
            item.interest_value(item.final_days_interest() * item.begin_balance());
            item.interest_balance_per(item.interest_value() / item.install_value() );
            item.interest_balance_per_final(1 - item.interest_balance_per() );
            item.principal_value(item.interest_balance_per_final() * item.install_value());
            item.total_install(item.principal_value() + item.interest_value());
            item.ending_balance(item.begin_balance() - item.principal_value());
            begin_balance_temp = item.ending_balance();
            self.installmentsTable.push(item);
        }
        console.log(self.installmentsTable());
          ko.utils.arrayForEach(self.installmentsTable(),
                        function (item) {
                            var itemTemp = {
                                    monthIndex: ko.observable(item.monthIndex()),
                                    begin_balance:ko.observable(Math.round(item.begin_balance()).toLocaleString('en')),
                        	        install_value:ko.observable(Math.round(item.install_value()).toLocaleString('en')),
                                    interest_balance_per:ko.observable(Math.round(item.interest_balance_per()).toLocaleString('en')),
                                    interest_value:ko.observable(Math.round(item.interest_value()).toLocaleString('en')),
                                    interest_balance_per_final:ko.observable(Math.round(item.interest_balance_per_final()).toLocaleString('en')),
                                    principal_value:ko.observable(Math.round(item.principal_value()).toLocaleString('en')),
                                    ending_balance:ko.observable(Math.round(item.ending_balance()).toLocaleString('en')),
                                    total_install:ko.observable(Math.round(item.total_install()).toLocaleString('en')),
                                    days_interest:ko.observable(Math.round(item.days_interest()).toLocaleString('en')),
                                    final_days_interest:ko.observable(Math.round(item.final_days_interest()).toLocaleString('en')),
                                    no_of_days:ko.observable(Math.round(item.no_of_days()).toLocaleString('en')),
                                    actual_year_days:ko.observable(Math.round(item.actual_year_days()).toLocaleString('en')),
                                }
                                if(itemTemp.ending_balance() == '-0'){
                                   itemTemp.ending_balance(0);
                                }
                                self.installmentsTableTemp.push(itemTemp);

                        });
    }
}
ko.applyBindings(new ManageLoanViewModel());
});


