import { Injectable } from '@angular/core';
import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';
/* import { AdminProductValidComponent } from '../AdminPanel/Widget/PopUp/AdminProductValid/AdminProductValid.component';
import { TransactionComponent } from '../AdminPanel/Widget/PopUp/Transaction/Transaction.component';
import { TransferComponent } from '../AdminPanel/Widget/PopUp/Transfer/Transfer.component';
import { TransactionResponseComponent } from '../AdminPanel/Widget/PopUp/TransactionResponse/TransactionResponse.component';
import { InvoiceDetailComponent } from '../AdminPanel/Widget/PopUp/InvoiceDetail/InvoiceDetail.component';
import { TransactionDetailComponent } from '../AdminPanel/Widget/PopUp/TransactionDetail/TransactionDetail.component';
import { InvoiceDetailUsrComponent } from '../AdminPanel/Widget/PopUp/InvoiceDetailUsr/InvoiceDetailUsr.component';
import { StoreDetailViewComponent } from '../AdminPanel/Widget/PopUp/StoreDetailView/StoreDetailView.component';
import { LocationPredeterminedComponent } from '../AdminPanel/Widget/PopUp/LocationPredetermined/LocationPredetermined.component';
import { PopUpHomeComponent } from '../AdminPanel/Widget/PopUp/PopUpHome/PopUpHome.component';
import { SeeListDialogComponent } from '../AdminPanel/Widget/PopUp/SeeListDialog/SeeListDialog.component';
import { DeleteLocationUserComponent } from '../AdminPanel/Widget/PopUp/DeleteLocationUser/DeleteLocationUser.component';
import { FailTransactionGatewayComponent } from '../AdminPanel/Widget/PopUp/FailTransactionGateway/FailTransactionGateway.component';
import { FailErrorTransactionGatewayComponent } from '../AdminPanel/Widget/PopUp/FailErrorTransactionGateway/FailErrorTransactionGateway.component'; */


//FailTransactionGatewayComponent

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../src/environments/environment';
import { StoredetailviewComponent } from '../AdminPanel/Widget/PopUp/storedetailview/storedetailview.component';
import { AdminproductvalidComponent } from '../AdminPanel/Widget/PopUp/adminproductvalid/adminproductvalid.component';
import { DeletelocationuserComponent } from '../AdminPanel/Widget/PopUp/deletelocationuser/deletelocationuser.component';
import { FailtransactiongatewayComponent } from '../AdminPanel/Widget/PopUp/failtransactiongateway/failtransactiongateway.component';
import { FailerrortransactiongatewayComponent } from '../AdminPanel/Widget/PopUp/failerrortransactiongateway/failerrortransactiongateway.component';
import { LocationpredeterminedComponent } from '../AdminPanel/Widget/PopUp/locationpredetermined/locationpredetermined.component';
import { PopuphomeComponent } from '../AdminPanel/Widget/PopUp/popuphome/popuphome.component';
import { TransferComponent } from '../AdminPanel/Widget/PopUp/transfer/transfer.component';
import { TransactionresponseComponent } from '../AdminPanel/Widget/PopUp/transactionresponse/transactionresponse.component';
import { TransactionComponent } from '../AdminPanel/Widget/PopUp/transaction/transaction.component';
import { TransactiondetailComponent } from '../AdminPanel/Widget/PopUp/transactiondetail/transactiondetail.component';
import { InvoicedetailusrComponent } from '../AdminPanel/Widget/PopUp/invoicedetailusr/invoicedetailusr.component';
import { InvoicedetailComponent } from '../AdminPanel/Widget/PopUp/invoicedetail/invoicedetail.component';
import { BinnancleComponent } from '../AdminPanel/Widget/PopUp/binnancle/binnancle.component';
//import { BinnacleComponent } from '../AdminPanel/Widget/PopUp/Binnacle/Binnacle.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    //BASE URL'S FROM BACKEND
    baseUrl = environment.api.baseUrl;
    baseAuthUrl = environment.api.baseAuthUrl;
    baseUrlApiPaymentGateway = environment.api.baseAuthGateway;

    baseMenusUrl = `${this.baseUrl}menus/`;
    baseUsersUrl = `${this.baseUrl}users/`;
    baseGropusUrl = `${this.baseUrl}group-list/`;
    baseStoreUrl = `${this.baseUrl}store/`;
    baseUpdateStoreUrl = `${this.baseUrl}store_update/`;
    baseRegisterTypeUrl = `${this.baseUrl}get_type_register/`;
    baseUpdatePercentageStoreUrl = `${this.baseUrl}update_percentage_store/`;
    baseStoreByCategory = `${this.baseUrl}store_by_category_data/`;
    baseStoreDataUrl = `${this.baseUrl}store_complete_data/`;
    baseScheduleDataUrl = `${this.baseUrl}get_schedule/`;
    baseStoreDocumentsUrl = `${this.baseUrl}store_documents/`;
    baseGetGeocordesUrl = `${this.baseUrl}get_geocordenates/`;
    baseStoreBankAccountsUrl = `${this.baseUrl}bank_accounts/`;
    baseStoreWithoutAutUrl = `${this.baseUrl}store_front/`;
    baseValidateUserExist = `${this.baseUrl}validate_user/`;
    baseDepartmentsUrl = `${this.baseUrl}departments/`;
    baseCitiesUrl = `${this.baseUrl}cities/`;
    baseCountLocationUrl = `${this.baseUrl}count_location/`;
    baseRatesUrl = `${this.baseUrl}get_rates_sc/`;
    baseProductsUrl = `${this.baseUrl}products/`;
    baseServiceUpdate = `${this.baseUrl}update_services/`;
    baseQualitiesUpdate = `${this.baseUrl}update_qualities/`;
    baseServiceDelete = `${this.baseUrl}delete_services/`;
    baseQualitiesDelete = `${this.baseUrl}delete_qualities/`;
    
    baseGetServiceProduct = `${this.baseUrl}get_services_product/`;
    baseGetQualitiesProduct = `${this.baseUrl}get_qualities_product/`;

    baseCategoriesUrl = `${this.baseUrl}categories/`;
    basePercentageSaleUrl = `${this.baseUrl}payment_percentages_sale/`;
    basePercentageTaxUrl = `${this.baseUrl}percentages_tax/`;    
    basePercentagePaymentUrl = `${this.baseUrl}payment_percentages_payment/`;
    baseApiTransactionUrl = `${this.baseUrl}get_con_api_data/`;
    baseSocietyTypeUrl = `${this.baseUrl}society_type/`;
    baseSubCategoriesUrl = `${this.baseUrl}subcategories/`;
    baseFindCategoryBySubcategoryUrl = `${this.baseUrl}find_category_by_subcategory/`;
    baseCategoriesStoreUrl = `${this.baseUrl}category_store/`;
    baseImagesUrl = `${this.baseUrl}images/`;
    baseLastImageIdUrl = `${this.baseUrl}last_image/`;
    baseCountImageIdUrl = `${this.baseUrl}count_image_prod/`;
    baseProdStUrl = `${this.baseUrl}get_prod_store/`;
    baseProductWithoutAutUrl = `${this.baseUrl}product_store/`;
    baseProductByGeocordeWithoutAutUrl = `${this.baseUrl}get_prod_bygeo_store/`;
    baseProductBySearchWithoutAutUrl = `${this.baseUrl}get_prod_bysearch_store/`;
    baseProductByFilterWithoutAutUrl = `${this.baseUrl}get_prod_byfilter_store/`;
    baseServiceScprtUrl = `${this.baseUrl}services_scort/`;
    baseQualitiesScortUrl = `${this.baseUrl}qualities_scort/`;
    baseViewProductWithoutAutUrl = `${this.baseUrl}view/product_store/`;
    baseVAlidateImageProdUrl = `${this.baseUrl}validate_image_prod/`;
    baseProducConfirmUrl = `${this.baseUrl}product_confirm/`;
    baseProductStoreWithoutAutUrl = `${this.baseUrl}store_products_front/`;
    baseProductStoreWithoutWhAutUrl = `${this.baseUrl}store_products_front_with/`;    
    baseAdminProductsUrl = `${this.baseUrl}admin_products/`;
    baseFilterProductsUrl = `${this.baseUrl}product_filter/`;    
    baseFilterLocationsUrl = `${this.baseUrl}location_find/`;    
    baseLocationClientUrl = `${this.baseUrl}location_client/`;
    baseDepartmentsFrontUrl = `${this.baseUrl}departments_front/`;
    baseCitiesFrontUrl = `${this.baseUrl}cities_front/`;
    baseLocationsFrontUrl = `${this.baseUrl}locations_front/`;    
    baseBanksFrontUrl = `${this.baseUrl}banks/`;
    baseTypeAccountsFrontUrl = `${this.baseUrl}type_accounts/`;
    baseUsersFrontUrl = `${this.baseUrl}user_front/`;
    baseUsersResetPassRequestFrontUrl = `${this.baseUrl}password_reset_market/`;
    baseUpdateUserUrl = `${this.baseUrl}user_group_edit/`;
    baseCancelTransactionFrontUrl = `${this.baseUrl}cancel_transaction/`;
    basesetContraTransactionFrontUrl = `${this.baseUrl}contra_transaction/`;
    baseUsersResetPassFrontUrl = `${this.baseUrl}password_reset_market/confirm/`;
    baseUsersTypeUrl = `${this.baseUrl}user_type/`;  
    baseUsersGroupUrl = `${this.baseUrl}user_group/`;  
    baseLocationByUser = `${this.baseUrl}locations_by_user/`;
    baseLocationPredeterByUser = `${this.baseUrl}location_client_checkout/`;
    baseAutenticationGateway = `${this.baseUrl}data_autentication_gateway/`;
    baseGetUserId = `${this.baseUrl}user_store/`;
    baseLocationById = `${this.baseUrl}locations_by_id/`;
    baseGetUserDataById = `${this.baseUrl}get_user/`;
    baseLocationUpdatePredById = `${this.baseUrl}general_update_location/`;
    baseLocationProdCategory = `${this.baseUrl}products_categories/`;
    baseLocationProdSubcategory = `${this.baseUrl}product_subcategory/`;
    baseTypeIdentifiersFrontUrl = `${this.baseUrl}type_identifier_front/`;
    baseCreateProductFrontUrl = `${this.baseUrl}create_product/`;
    baseListInvoicesFrontUrl = `${this.baseUrl}list_invoice/`;
    baseListInvoicesByStoreFrontUrl = `${this.baseUrl}invoice_by_store/`;
    baseListInvoicesByUserFrontUrl = `${this.baseUrl}list_user_invoice/`;
    baseListHeaderInvoiceFrontUrl = `${this.baseUrl}invoice_header/`;
    baseListDetailInvoicesFrontUrl = `${this.baseUrl}invoice_detail/`;
    baseInvoiceProcesFrontUrl = `${this.baseUrl}invoice_process_status/`;
    baseCheckoutInvoiceFrontUrl = `${this.baseUrl}check_invoice/`;
    baseListDetailInvoicesUserFrontUrl = `${this.baseUrl}list_user_invoice_detail/`;
    baseUpdateInvoiceStatusFrontUrl = `${this.baseUrl}update_status_invoice/`;
    baseUpdateCheckCallControllFrontUrl = `${this.baseUrl}update_checkvalidation_invoice/`;
    baseUpdateCheckRecordFrontUrl = `${this.baseUrl}update_checkrecord_invoice/`;
    baseUpdateCheckShipmentFrontUrl = `${this.baseUrl}update_checkshipment_invoice/`;    
    baseUpdateCheckFinalyFrontUrl = `${this.baseUrl}update_checkfinaly_invoice/`;        
    

    baseUpdateShippingVoucherInvoiceFrontUrl = `${this.baseUrl}update_shippingvoucher_invoice/`;
    baseUpdateLetterReceivedInvoiceFrontUrl = `${this.baseUrl}update_letterreceived_invoice/`;
    baseStoreCategoriesFrontUrl = `${this.baseUrl}store_categories/`;
    baseRequestMembershipFrontUrl = `${this.baseUrl}membership_request/`;
    baseAssistedSellingFrontUrl = `${this.baseUrl}set_assisted_selling/`;
    baseLoadDocumentsFrontUrl = `${this.baseUrl}load_documents/`;
    baseLoadLogoStoreUrl = `${this.baseUrl}load_logo/`;
    baseLoadImageProductFrontUrl = `${this.baseUrl}load_images/`;
    baseDeleteProductImageUrl = `${this.baseUrl}delete_images/`;
    baseBankAccountsFrontUrl = `${this.baseUrl}bank_accounts_save/`;
    baseGetAllTransactionsUrl = `${this.baseUrl}get_all_transactions/`;
    basesendEmailTransferRequest = `${this.baseUrl}send_email_transfer_request/`;
    basesendSendSellEmail = `${this.baseUrl}send_sell_email/`;
    basesendEmailReplyTransfer = `${this.baseUrl}send_email_reply_transfer/`;
    basesendEmailRejectionTransactionCustomer =`${this.baseUrl}send_email_rejection_transaction/`;
    basesendEmailStoreCreationRequest = `${this.baseUrl}send_email_store_creation_request/`;
    basesendCustomerStoreEmail = `${this.baseUrl}send_customer_store_email/`;
    baseSetSchedule = `${this.baseUrl}set_schedules/`;
    baseDeleteSchedule = `${this.baseUrl}delete_schedules/`;
    baseUpdateTypeScheduleUrl = `${this.baseUrl}update_schedule_type/`;
    baseGeocordenatesUrl = `${this.baseUrl}update_geocorde_store/`;
    basesendSellerStoreEmail = `${this.baseUrl}send_seller_store_email/`;
    baseSendEmailWelcomeStore = `${this.baseUrl}send_sell_aprobe_email/`;
    baseSendEmailAprobePayment = `${this.baseUrl}send_payment_status_email/`;
    baseSendEmailWelcomeRejectStore = `${this.baseUrl}send_sell_reject_email/`;
    baseSendAdAprove = `${this.baseUrl}send_ad_aproved_email/`;
    baseSendAdReject = `${this.baseUrl}send_ad_reject_email/`;
    baseGetBalanceAccountFrontUrl = `${this.baseUrl}get_balance_account/`;
    baseGetBalanceDetailAccountFrontUrl = `${this.baseUrl}get_balance_detail_account/`;
    baseRequestTransferFrontUrl = `${this.baseUrl}transfer_request/`;
    baseGetTransferDataFrontUrl = `${this.baseUrl}get_transfer_data/`;
    baseListTransfersByStoreFrontUrl = `${this.baseUrl}get_all_transfer_data/`;
    baseListTransfersByIdFrontUrl = `${this.baseUrl}get_transfer_detail_data/`;
    baseChangeStateTransferFrontUrl = `${this.baseUrl}status_transfer/`;
    baseListTransactionsByStoreFrontUrl = `${this.baseUrl}get_transaction_by_store/`;
    baseListTransactionsByIdFrontUrl = `${this.baseUrl}get_transaction_by_id/`;

    //BASE URL'S FROM PAYMENT GATEWAY    
    baseAuthPaymentGateway = `${this.baseUrlApiPaymentGateway}/api/auth/accountlogin`;
    baseHashcardPaymentGateway = `${this.baseUrlApiPaymentGateway}/api/v1/hashcard`;
    TransactionFromBackendUrl = `${this.baseUrl}set_transaction_core/`;
    paymentScortUrl = `${this.baseUrl}payment_scort/`;
    baseUpdateStock =  `${this.baseUrl}update_stock/`;

    baseListBinnacles = `${this.baseUrl}list_binnacles/`;
    baseCreateBinnacle = `${this.baseUrl}create_binnacle/`;
    baseBinnacleCheckFrontUrl =  `${this.baseUrl}binnacle_check_status/`;
    baseListBinnaclesNumber = `${this.baseUrl}get_binnacle_number/`;
    BaseDataExportableTransaction = `${this.baseUrl}exportable_transaction/`;

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        private httpClient: HttpClient,
        private cookieService: CookieService,
        private dialog: MatDialog,
    ) { }

    // Admin apis

    getRegisterType() {
        return this.httpClient.get(this.baseRegisterTypeUrl, { headers: this.getAuthHeaders() });
    }

    getMenus() {
        return this.httpClient.get(this.baseMenusUrl, { headers: this.getAuthHeaders() });
    }
    getUsers() {
        let userList: any;
        userList = this.httpClient.get(this.baseUsersUrl, { headers: this.getAuthHeaders() });
        return userList;
    }
    getGroupsList() {
        return this.httpClient.get(this.baseGropusUrl, { headers: this.getAuthHeaders() });
    }
    registerUser(authData:any) {
        console.log(authData);
        const body = JSON.stringify(authData);
        return this.httpClient.post(`${this.baseUsersUrl}`, body, { headers: this.getAuthHeaders() });
    }
    

    UpdateUser(UserData:any, id_user:number){
        const body = JSON.stringify(UserData);
        return this.httpClient.put(`${this.baseUpdateUserUrl}${id_user}/`, body, { headers: this.getAuthHeaders() });
    }

    loginUser(authData:any) {
        const body = JSON.stringify(authData);
        return this.httpClient.post(`${this.baseAuthUrl}`, body, { headers: this.headers });
    }


    // Store transaction
    getAllTransactions() {
        return this.httpClient.get(this.baseGetAllTransactionsUrl, { headers: this.getAuthHeaders() });
    }


    // Locations Apis
    getDepartments() {
        let departmentsList: any;
        departmentsList = this.httpClient.get(this.baseDepartmentsUrl, { headers: this.getAuthHeaders() });
        return departmentsList;
    }

    getCitiesbyDepartments(id: number) {
        let citiesList: any;
        citiesList = this.httpClient.get(`${this.baseCitiesUrl}?id_departament=${id}`, { headers: this.getAuthHeaders() });
        return citiesList;
    }

    // Store apis


    getPercentagesSale() {
        let percentage_sale: any;
        percentage_sale = this.httpClient.get(this.basePercentageSaleUrl, { headers: this.getAuthHeaders() });
        return percentage_sale;
    }

    getPercentagesTax() {
        let percentage_sale: any;
        percentage_sale = this.httpClient.get(this.basePercentageTaxUrl, { headers: this.getAuthHeaders() });
        return percentage_sale;
    }

    getPercentagesPayment() {
        let percentage_payment: any;
        percentage_payment = this.httpClient.get(this.basePercentagePaymentUrl, { headers: this.getAuthHeaders() });
        return percentage_payment;
    }

    getCuc() {
        let cuc_data: any;
        cuc_data = this.httpClient.get(this.baseApiTransactionUrl, { headers: this.getAuthHeaders() });
        return cuc_data;
    }

    setMembershipRequest(requestData:any) {
        const body = JSON.stringify(requestData);
        return this.httpClient.post(`${this.baseRequestMembershipFrontUrl}`, body, { headers: this.getAuthHeaders() });
    }

    getCountLocation(id_city: number) {
        let count: any;
        count = this.httpClient.get(`${this.baseCountLocationUrl}?id_city=${id_city}`, { headers: this.getAuthHeaders() });
        return count;
    }

    setLoadDocumentsStore(requestData:any) {
        return this.httpClient.post<any>(`${this.baseLoadDocumentsFrontUrl}`, requestData);
    }

    setBankAccountStore(requestData:any) {
        return this.httpClient.post<any>(`${this.baseBankAccountsFrontUrl}`, requestData);
    }

    getStore() {
        let storeList: any;
        storeList = this.httpClient.get(this.baseStoreUrl, { headers: this.getAuthHeaders() });
        return storeList;
    }

    getStoreCategories() {
        let categories: any;
        categories = this.httpClient.get(this.baseStoreCategoriesFrontUrl, { headers: this.getAuthHeaders() });
        return categories;
    }

    getSocietyType() {
        let categories: any;
        categories = this.httpClient.get(this.baseSocietyTypeUrl, { headers: this.getAuthHeaders() });
        return categories;
    }

    getStoreWithoutAuth() {
        let storeList: any;
        storeList = this.httpClient.get(this.baseStoreWithoutAutUrl, { headers: this.getAuthHeaders() });
        return storeList;
    }

    getStoreWithoutAuthbyId(id_store:number) {        
        let store: any;
        // store = this.httpClient.get(`${this.baseStoreWithoutAutUrl}${id_store}`, { headers: this.getAuthHeaders() });
        store = this.httpClient.get(`${this.baseStoreWithoutAutUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store;
    }

    getStoreWithoutAuthbyIdCategory(id_category:number) {        
        let store: any;
        // store = this.httpClient.get(`${this.baseStoreWithoutAutUrl}${id_store}`, { headers: this.getAuthHeaders() });
        store = this.httpClient.get(`${this.baseStoreWithoutAutUrl}?id_category=${id_category}`, { headers: this.getAuthHeaders() });
        return store;
    }

    getStorebyCategory(id_category:number) {
        let store: any;
        store = this.httpClient.get(`${this.baseStoreByCategory}?storecategories_id=${id_category}`, { headers: this.getAuthHeaders() });
        return store;
    }

    setStore(storeData:any) {
        console.log(storeData);
        const body = JSON.stringify(storeData);
        return this.httpClient.post(`${this.baseStoreUrl}`, body, { headers: this.getAuthHeaders() });
    }

    updateStore(storeData: any, id_store:number) {
        const body = JSON.stringify(storeData);
        return this.httpClient.put(`${this.baseUpdateStoreUrl}${id_store}/action_store/`, body, { headers: this.getAuthHeaders() });
    }

    updatePercentagesStore(storeData:any, id_store:number) {
        const body = JSON.stringify(storeData);
        return this.httpClient.put(`${this.baseUpdatePercentageStoreUrl}${id_store}/`, body, { headers: this.getAuthHeaders() });
    }


    uploadIconStore(requestData:any) {
        return this.httpClient.post<any>(`${this.baseLoadLogoStoreUrl}`, requestData);
    }

    updateLogoFieldStore(name_logo: string, productId: number) {
        const body = JSON.stringify({ logo_store: name_logo });
        return this.httpClient.post(`${this.baseStoreUrl}${productId}/action_store/`, body, { headers: this.getAuthHeaders() });
    }

    getStoreData(id_store:number) {
        let store: any;
        store = this.httpClient.get(`${this.baseStoreDataUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store;
    }

    getScheduleData(id_store:number) {
        let store: any;
        store = this.httpClient.get(`${this.baseScheduleDataUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store;
    }

    updateScheludeTypeStore(storeData:any, id_store:number) {
        const body = JSON.stringify(storeData);
        return this.httpClient.put(`${this.baseUpdateTypeScheduleUrl}${id_store}/`, body, { headers: this.getAuthHeaders() });
    }

    updateGeocordenatestore(storeData:any, id_store:number) {
        const body = JSON.stringify(storeData);
        return this.httpClient.put(`${this.baseGeocordenatesUrl}${id_store}/`, body, { headers: this.getAuthHeaders() });
    }

    getGeocordenates(id_store:number) {
        let store_geo: any;
        store_geo = this.httpClient.get(`${this.baseGetGeocordesUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store_geo;
    }


    getStoreDocuments(id_store: number) {
        let store_docs: any;
        store_docs = this.httpClient.get(`${this.baseStoreDocumentsUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store_docs;
    }

    getStoreBankAccountData(id_store:number) {
        let store_docs: any;
        store_docs = this.httpClient.get(`${this.baseStoreBankAccountsUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return store_docs;
    }

    PopUpStoreViewValidate(data: any, docs_data: any) {
        let dialogRef: MatDialogRef<StoredetailviewComponent>;
        dialogRef = this.dialog.open(StoredetailviewComponent);
        dialogRef.componentInstance.data = data;
        dialogRef.componentInstance.docs_data = docs_data;
        return dialogRef.afterClosed();
    }


    // Products Apis

    DeleteProductImage(requestData:any) {
        const body = JSON.stringify(requestData);
        return this.httpClient.post(`${this.baseDeleteProductImageUrl}`, body, { headers: this.getAuthHeaders() });
    }

    getImagesProducts(id_product:number) {
        let productsList: any;
        productsList = this.httpClient.get(`${this.baseImagesUrl}?id_product=${id_product}`, { headers: this.getAuthHeaders() });
        return productsList;
    }

    getLastImageProduct() {
        let LastImageId: any;
        LastImageId = this.httpClient.get(`${this.baseLastImageIdUrl}`, { headers: this.getAuthHeaders() });
        return LastImageId;
    }


    getCountImagesProducts(id_product: number) {
        let productImageCount: any;
        productImageCount = this.httpClient.get(`${this.baseCountImageIdUrl}?id_product=${id_product}`, { headers: this.getAuthHeaders() });
        return productImageCount;
    }

    getProductByStore(id_store: number) {
        let productSt: any;
        productSt = this.httpClient.get(`${this.baseProdStUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return productSt;
    }

    getProductsbyStoreid(id_store: number) {
        let imageproductList: any;
        imageproductList = this.httpClient.get(`${this.baseProductsUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return imageproductList;
    }

    getProductsbyIdAdmin(id_product: number) {
        let productData: any;
        productData = this.httpClient.get(`${this.baseProductsUrl}${id_product}`, { headers: this.getAuthHeaders() });
        return productData;
    }

    getProductStoresbyStoreid(id_store: number) {
        let productstore: any;
        productstore = this.httpClient.get(`${this.baseProductStoreWithoutAutUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return productstore;
    }

    getProductStoresbyStoreidWithout(id_store: number) {
        let productstore: any;
        productstore = this.httpClient.get(`${this.baseProductStoreWithoutWhAutUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return productstore;
    }


    getProductsbyId(id_store: number) {
        let prod: any;
        prod = this.httpClient.get(`${this.baseViewProductWithoutAutUrl}${id_store}`, { headers: this.getAuthHeaders() });
        return prod;
    }


    getValidateImagenProductsbyId(id_store: number) {
        let prod: any;
        prod = this.httpClient.get(`${this.baseVAlidateImageProdUrl}?id_product=${id_store}`, { headers: this.getAuthHeaders() });
        return prod;
    }


    getProductsWithoutAuth() {
        let prod: any;
        prod = this.httpClient.get(this.baseProductWithoutAutUrl,);
        return prod;
    }

    getProductsByGeocordeWithoutAuth(latbsr: any, lonbsr: any, kilometersnear: any) {        
        let prod: any;
        prod = this.httpClient.get(`${this.baseProductByGeocordeWithoutAutUrl}?latbsr=${latbsr}&lonbsr=${lonbsr}&kilometersnear=${kilometersnear}`, { headers: this.getAuthHeaders() });
        return prod;
    }

    getProductsBySearchWithoutAuth(search: any) {        
        let prod: any;
        prod = this.httpClient.get(`${this.baseProductBySearchWithoutAutUrl}?string_search=${search}`, { headers: this.getAuthHeaders() });
        return prod;
    }


    getProductsByFilterWithoutAuth(filter_code: any, filter_price_min: any, filter_price_max: any, filter_year_min: any, filter_year_max: any, filter_check_wp: any, filter_items_qua: any, filter_items_serv: any) {        
        let prod: any;
        prod = this.httpClient.get(`${this.baseProductByFilterWithoutAutUrl}?filter_code=${filter_code}&filter_price_min=${filter_price_min}&filter_price_max=${filter_price_max}&filter_year_min=${filter_year_min}&filter_year_max=${filter_year_max}&filter_check_wp=${filter_check_wp}&filter_items_qua=${filter_items_qua}&filter_items_serv=${filter_items_serv}`, { headers: this.getAuthHeaders() });
        return prod;
    }

    getProductsByGeocordeFilterWithoutAuth(filter_code: any, filter_price_min: any, filter_price_max: any, filter_year_min: any, filter_year_max: any, filter_check_wp: any, filter_items_qua: any, filter_items_serv: any, latbsr: any, lonbsr: any, kilometersnear: any) {        
        let prod: any;
        prod = this.httpClient.get(`${this.baseProductByFilterWithoutAutUrl}?filter_code=${filter_code}&filter_price_min=${filter_price_min}&filter_price_max=${filter_price_max}&filter_year_min=${filter_year_min}&filter_year_max=${filter_year_max}&filter_check_wp=${filter_check_wp}&filter_items_qua=${filter_items_qua}&filter_items_serv=${filter_items_serv}&latbsr=${latbsr}&lonbsr=${lonbsr}&kilometersnear=${kilometersnear}`, { headers: this.getAuthHeaders() });
        return prod;
    }

    getProductsBySearchFilterWithoutAuth(filter_code: any, filter_price_min: any, filter_price_max: any, filter_year_min: any, filter_year_max: any, filter_check_wp: any, filter_items_qua: any, filter_items_serv: any, string_search: any) {        
        let prod: any;
        prod = this.httpClient.get(`${this.baseProductByFilterWithoutAutUrl}?filter_code=${filter_code}&filter_price_min=${filter_price_min}&filter_price_max=${filter_price_max}&filter_year_min=${filter_year_min}&filter_year_max=${filter_year_max}&filter_check_wp=${filter_check_wp}&filter_items_qua=${filter_items_qua}&filter_items_serv=${filter_items_serv}&string_search=${string_search}`, { headers: this.getAuthHeaders() });
        return prod;
    }

    getServiceScort() {
        let prod: any;
        prod = this.httpClient.get(this.baseServiceScprtUrl,);
        return prod;
    }

    

    getServiceProd(product_id:number) {        
        let serviceProd: any;
        serviceProd = this.httpClient.get(`${this.baseGetServiceProduct}?product_id=${product_id}`, { headers: this.getAuthHeaders() });
        return serviceProd;
    }

    getQualityProd(product_id:number) {        
        let serviceProd: any;
        serviceProd = this.httpClient.get(`${this.baseGetQualitiesProduct}?product_id=${product_id}`, { headers: this.getAuthHeaders() });
        return serviceProd;
    }
        
    getQualitiesScort() {
        let prod: any;
        prod = this.httpClient.get(this.baseQualitiesScortUrl,);
        return prod;
    }


    setProduct(productData:any) {
        console.log(productData);
        const body = JSON.stringify(productData);
        return this.httpClient.post(`${this.baseCreateProductFrontUrl}`, body, { headers: this.getAuthHeaders() });
    }

    getAdminProduct() {
        return this.httpClient.get(`${this.baseAdminProductsUrl}`, { headers: this.getAuthHeaders() });
    }

    getCategories() {
        let categoriesList: any;
        categoriesList = this.httpClient.get(this.baseCategoriesUrl, { headers: this.getAuthHeaders() });
        return categoriesList;
    }

    getCategoriesStore(id_store: number) {
        let categories_store: any;
        categories_store = this.httpClient.get(`${this.baseCategoriesStoreUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return categories_store;
    }

    getSubCategories(id: number) {
        let subcategories: any;
        subcategories = this.httpClient.get(`${this.baseSubCategoriesUrl}?id_category=${id}`, { headers: this.getAuthHeaders() });
        return subcategories;
    }

    FindCategoryBySubcategory(subcategory_id: number) {
        let category: any;
        category = this.httpClient.get(`${this.baseFindCategoryBySubcategoryUrl}?subcategory_id=${subcategory_id}`, { headers: this.getAuthHeaders() });
        return category;
    }

    setImage(imageData:any) {
        const body = JSON.stringify(imageData);
        return this.httpClient.post(`${this.baseImagesUrl}`, body, { headers: this.getAuthHeaders() });
    }

    updateImageProduc(img: string, store_id: number) {
        const body = JSON.stringify({ image: img });
        return this.httpClient.post(`${this.baseProductsUrl}${store_id}/action_product/`, body, { headers: this.getAuthHeaders() });
    }

    updateProduc(product_data: any, product_id: number) {
        const body = JSON.stringify(product_data);
        return this.httpClient.put(`${this.baseProductsUrl}${product_id}/action_product/`, body, { headers: this.getAuthHeaders() });
    }
    
    updateService(service_data: any, product_id: number) {
        const body = JSON.stringify(service_data);
        return this.httpClient.put(`${this.baseServiceUpdate}${product_id}/`, body, { headers: this.getAuthFrontHeaders() });
    }

    updateQuality(quality_data: any, product_id: number) {
        const body = JSON.stringify(quality_data);
        return this.httpClient.put(`${this.baseQualitiesUpdate}${product_id}/`, body, { headers: this.getAuthFrontHeaders() });
    }

    deleteService(product_id: number) {
        const body = "";
        return this.httpClient.put(`${this.baseServiceDelete}${product_id}/`, body, { headers: this.getAuthFrontHeaders() });
    }

    deleteQualities(product_id: number) {
        const body = "";
        return this.httpClient.put(`${this.baseQualitiesDelete}${product_id}/`, body, { headers: this.getAuthFrontHeaders() });
    }

    deleteProduct(id_prod: any) {
        return this.httpClient.delete(`${this.baseProductsUrl}${id_prod}/action_product/`, { headers: this.getAuthHeaders() });
    }

    updateStateProduct(state: number, id_prod: number) {
        const body = JSON.stringify({ state: state });
        return this.httpClient.put(`${this.baseProductsUrl}${id_prod}/action_product_state/`, body, { headers: this.getAuthHeaders() });
    }

    uploadFile(requestData: any) {
        return this.httpClient.post<any>(`${this.baseLoadImageProductFrontUrl}`, requestData);
    }


    // Admin product apis

    PopUpAdminProductsValidate(data: any) {
        let dialogRef: MatDialogRef<AdminproductvalidComponent>;        
        dialogRef = this.dialog.open(AdminproductvalidComponent, { panelClass: 'custom-dialog-container-productadm' });        
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    getProductsConfirmbyId(id_store:number) {
        let prod: any;
        prod = this.httpClient.get(`${this.baseProducConfirmUrl}${id_store}`, { headers: this.getAuthHeaders() });
        return prod;
    }

    // Apis to front store

    FilterProducts(string_search:any) {
        let filter_produc: any;
        filter_produc = this.httpClient.get(`${this.baseFilterProductsUrl}?string_search=${string_search}`, { headers: this.getAuthFrontHeaders() });
        return filter_produc;
    }

    FilterLoctions(string_search:any) {
        let filter_locations: any;
        filter_locations = this.httpClient.get(`${this.baseFilterLocationsUrl}?string_search=${string_search}`, { headers: this.getAuthFrontHeaders() });
        return filter_locations;
    }

    SetLocationClient(location:any) {
        const body = JSON.stringify(location);
        return this.httpClient.post(`${this.baseLocationClientUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    getDepartmentsFront() {
        let departmentsList: any;
        departmentsList = this.httpClient.get(this.baseDepartmentsFrontUrl, { headers: this.getAuthFrontHeaders() });
        return departmentsList;
    }

    getCitiesFrontbyDepartments(id: string) {
        let citiesList: any;
        citiesList = this.httpClient.get(`${this.baseCitiesFrontUrl}?id_departament=${id}`, { headers: this.getAuthFrontHeaders() });
        return citiesList;
    }


    getLocationFrontbyCity(id: number) {
        let locationList: any;
        locationList = this.httpClient.get(`${this.baseLocationsFrontUrl}?id_city=${id}`, { headers: this.getAuthFrontHeaders() });
        return locationList;
    }


    getBanksFront() {
        let bankList: any;
        bankList = this.httpClient.get(this.baseBanksFrontUrl, { headers: this.getAuthFrontHeaders() });
        return bankList;
    }

    getTypeAccountFront() {
        let typeaccountList: any;
        typeaccountList = this.httpClient.get(this.baseTypeAccountsFrontUrl, { headers: this.getAuthFrontHeaders() });
        return typeaccountList;
    }

    getUserId(id_store:number) {
        let get_user_id: any;
        get_user_id = this.httpClient.get(`${this.baseGetUserId}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return get_user_id;
    }

    setUpdateUserTypeFront(Data:any, id_user:number) {        
        const body = JSON.stringify(Data);
        return this.httpClient.put(`${this.baseUsersTypeUrl}${id_user}/users_action_update_type/`, body, { headers: this.getAuthHeaders() });
    }

    setUpdateUserGroup(Data:any, id_user:number) {
        const body = JSON.stringify(Data);
        return this.httpClient.put(`${this.baseUsersGroupUrl}${id_user}/action_user_group/`, body, { headers: this.getAuthHeaders() });
    }

    registerUserFront(authData:any) {
        console.log(authData);
        const body = JSON.stringify(authData);
        return this.httpClient.post(`${this.baseUsersFrontUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    getUserById(id_user:number) {
        let locations: any;
        locations = this.httpClient.get(`${this.baseGetUserDataById}?id_user=${id_user}`, { headers: this.getAuthHeaders() });
        return locations;
    }

    sendEmailStoreCreationRequest(emailData:any){
        const body = JSON.stringify(emailData);
        console.log(body);
        return this.httpClient.post(`${this.basesendEmailStoreCreationRequest}`, body, { headers: this.getAuthFrontHeaders() });
    }
    sendEmailCustomerRequest(emailData:any){
        const body = JSON.stringify(emailData);
        console.log(body);
        return this.httpClient.post(`${this.basesendCustomerStoreEmail}`, body, { headers: this.getAuthFrontHeaders() });
    }

    setSchedule(ScheduleData:any){
        const body = JSON.stringify(ScheduleData);
        console.log(body);
        return this.httpClient.post(`${this.baseSetSchedule}`, body, { headers: this.getAuthFrontHeaders() });
    }

    deleteSchedule(store_id: number) {
        // const body = JSON.stringify(product_data);
        const body = "";
        return this.httpClient.put(`${this.baseDeleteSchedule}${store_id}/`, body, { headers: this.getAuthFrontHeaders() });
    }

    getRates(id: number) {
        let ratesList: any;
        ratesList = this.httpClient.get(`${this.baseRatesUrl}?product_id=${id}`, { headers: this.getAuthFrontHeaders() });
        return ratesList;
    }


    sendEmailSellRequest(emailData:any) {
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.basesendSendSellEmail}`, body, { headers: this.getAuthFrontHeaders() });
    }


    sendSellerStoreEmail(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.basesendSellerStoreEmail}`, body, { headers: this.getAuthFrontHeaders() });
    }
    sendEmailRejectionTransactionCustomer(emailData:any) {
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.basesendEmailRejectionTransactionCustomer}`, body, { headers: this.getAuthFrontHeaders() });
    }
    sendEmailTransferRequest(emailData:any) {
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.basesendEmailTransferRequest}`, body, { headers: this.getAuthFrontHeaders() });
    }
    sendEmailReplyTransfer(emailData:any) {
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.basesendEmailReplyTransfer}`, body, { headers: this.getAuthFrontHeaders() });
    }
    resetPasswordRequestUser(emailData:any) {
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseUsersResetPassRequestFrontUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }
    sendEmailWelcomeStore(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseSendEmailWelcomeStore}`, body, { headers: this.getAuthFrontHeaders() });
    }

    sendEmailAprobePayment(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseSendEmailAprobePayment}`, body, { headers: this.getAuthFrontHeaders() });
    }


    sendEmailWelcomeRejectStore(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseSendEmailWelcomeRejectStore}`, body, { headers: this.getAuthFrontHeaders() });
    }

    sendAdAprove(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseSendAdAprove}`, body, { headers: this.getAuthFrontHeaders() });
    }

    sendAdReject(emailData:any){
        const body = JSON.stringify(emailData);
        return this.httpClient.post(`${this.baseSendAdReject}`, body, { headers: this.getAuthFrontHeaders() });
    }


    resetPasswordUser(resetData:any) {
        const body = JSON.stringify(resetData);
        return this.httpClient.post(`${this.baseUsersResetPassFrontUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    ValidateUserExist(username:any) {
        let store: any;
        store = this.httpClient.get(`${this.baseValidateUserExist}?username=${username}`, { headers: this.getAuthHeaders() });
        return store;
    }
    

    updateStoreUserFront(Data:any, id_user:string) {
        const body = JSON.stringify(Data);
        return this.httpClient.put(`${this.baseUsersFrontUrl}${id_user}/users_action_update_store/`, body, { headers: this.getAuthHeaders() });
    }

    getUserProfileFront(id_user:number) {
        let user: any;
        user = this.httpClient.get(`${this.baseUsersUrl}${id_user}`, { headers: this.getAuthFrontHeaders() });
        return user;
    }

    FilterLocationsByIdUser(id_user_front?:string) {
        let filter_locations: any;
        filter_locations = this.httpClient.get(`${this.baseLocationByUser}?id_user_front=${id_user_front}`, { headers: this.getAuthFrontHeaders() });
        return filter_locations;
    }

    PredeterminateLocationsByIdUser(id_user_front:number) {
        let filter_locations: any;
        filter_locations = this.httpClient.get(`${this.baseLocationPredeterByUser}?id_user_front=${id_user_front}`, { headers: this.getAuthFrontHeaders() });
        return filter_locations;
    }
    updateStock(stock_data:any,id_product:number){
        const body = JSON.stringify(stock_data);
        return this.httpClient.put(`${this.baseUpdateStock}${id_product}/`, body, { headers: this.getAuthFrontHeaders() });
    }
    getAutenticationGateway() {
        let filter_locations: any;
        filter_locations = this.httpClient.get(`${this.baseAutenticationGateway}`, { headers: this.getAuthFrontHeaders() });
        return filter_locations;
    }
    

    deleteLocationUserDialog(data: any) {
        let dialogRef: MatDialogRef<DeletelocationuserComponent>;
        dialogRef = this.dialog.open(DeletelocationuserComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    FailTransactionDialog(data: string) {
        let dialogRef: MatDialogRef<FailtransactiongatewayComponent>;
        dialogRef = this.dialog.open(FailtransactiongatewayComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    ErrorTransactionDialog(data: string) {
        let dialogRef: MatDialogRef<FailerrortransactiongatewayComponent>;
        dialogRef = this.dialog.open(FailerrortransactiongatewayComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    deleteLocationAction(id_location: number) {
        return this.httpClient.delete(`${this.baseLocationClientUrl}${id_location}/action_location/`, { headers: this.getAuthFrontHeaders() });
    }

    updateInformationUserFront(data:any, id_user: number) {
        const body = data;
        return this.httpClient.put(`${this.baseUsersUrl}${id_user}/action_user/`, body, { headers: this.getAuthFrontHeaders() });
    }


    getLocationClientFront(id_location:number) {
        let locations: any;
        locations = this.httpClient.get(`${this.baseLocationById}?id_location=${id_location}`, { headers: this.getAuthFrontHeaders() });
        return locations;
    }

    updateLocationAction(body: string, id_location: number) {
        return this.httpClient.put(`${this.baseLocationClientUrl}${id_location}/action_location/`, body, { headers: this.getAuthFrontHeaders() });
    }

    updateLocationPredetermined(body: string, id_location: number) {
        return this.httpClient.put(`${this.baseLocationUpdatePredById}${id_location}/action_location/`, body, { headers: this.getAuthFrontHeaders() });
    }

    stablishPrederminedLocation(data: string) {
        let dialogRef_sta: MatDialogRef<LocationpredeterminedComponent>;
        dialogRef_sta = this.dialog.open(LocationpredeterminedComponent);
        dialogRef_sta.componentInstance.data = data;
        return dialogRef_sta.afterClosed();
    }
    stablishPopUpHome(){
        let dialogRef_sta: MatDialogRef<PopuphomeComponent>;
        dialogRef_sta = this.dialog.open(PopuphomeComponent, { panelClass: 'custom-dialog-container' } );
        return dialogRef_sta.afterClosed();
    }
    
    getProductsbyCategory(id_category:number) {
        let prods_category: any;
        prods_category = this.httpClient.get(`${this.baseLocationProdCategory}?id_category=${id_category}`, { headers: this.getAuthHeaders() });
        return prods_category;
    }

    getProductsbyCategorybyStore(id_category:number, id_store:number) {
        let prods_category: any;
        prods_category = this.httpClient.get(`${this.baseLocationProdCategory}?id_category=${id_category}&id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return prods_category;
    }

    getProductsbySubcategory(id_subcategory:number) {
        let prods_subcategory: any;
        prods_subcategory = this.httpClient.get(`${this.baseLocationProdSubcategory}?subcategory_id=${id_subcategory}`, { headers: this.getAuthHeaders() });
        return prods_subcategory;
    }

    getProductsbySubcategorybyStore(id_subcategory:number, store_id:number) {
        let prods_subcategory: any;
        prods_subcategory = this.httpClient.get(`${this.baseLocationProdSubcategory}?subcategory_id=${id_subcategory}&id_store=${store_id}`, { headers: this.getAuthHeaders() });
        return prods_subcategory;
    }


    getTypreIdentifiersFront() {
        let identifiersList: any;
        identifiersList = this.httpClient.get(this.baseTypeIdentifiersFrontUrl, { headers: this.getAuthFrontHeaders() });
        return identifiersList;
    }


    // Apis to Payment Gateway
    AuthPaymentGateway(account_id_gateway: number, api_key_gateway: any ) {
        let JsonAuth = { account_id: account_id_gateway, api_key: api_key_gateway };
        const body = JsonAuth;
        return this.httpClient.post(`${this.baseAuthPaymentGateway}`, body, {});
    }


    SendTransactionDataToBackend(DataTransaction:any) {
        const body = DataTransaction;
        return this.httpClient.post(`${this.TransactionFromBackendUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    SendPaymentScort(DataTransaction:any) {
        const body = DataTransaction;
        return this.httpClient.post(`${this.paymentScortUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    HashCardPaymentGateway(CardData:any) {
        const body = CardData;
        return this.httpClient.post(`${this.baseHashcardPaymentGateway}`, body, { headers: this.getPaymentGatewayHeaders() });
    }


    // Transfers

    setTransferRequest(requestData:any) {
        const body = JSON.stringify(requestData);
        return this.httpClient.post(`${this.baseRequestTransferFrontUrl}`, body, { headers: this.getAuthFrontHeaders() });
    }

    GetTransfersByIdStore(id_store: number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListTransfersByStoreFrontUrl}?id_store=${id_store}`, { headers: this.getAuthFrontHeaders() });
        return invDetail;
    }

    GetTransfersById(id:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListTransfersByIdFrontUrl}?id_transfe=${id}`, { headers: this.getAuthFrontHeaders() });
        return invDetail;
    }

    GetTransfersByIdPanelAdmin(id: number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListTransfersByIdFrontUrl}?id_transfe=${id}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }

    GetAllTransfers() {
        return this.httpClient.get(this.baseListTransfersByStoreFrontUrl, { headers: this.getAuthHeaders() });
    }


    PopUpAdminTransfers(data: any) {
        let dialogRef: MatDialogRef<TransferComponent>;        
        dialogRef = this.dialog.open(TransferComponent, { panelClass: 'custom-dialog-container-transfer' });        
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    ChangeStateAprobe(id_transfer: number, jsonObjChange: any) {        
        const body = JSON.stringify(jsonObjChange);
        return this.httpClient.put(`${this.baseChangeStateTransferFrontUrl}${id_transfer}/`, body, { headers: this.getAuthHeaders() });
    }


    // Transactions

    PopUpTransactionDetail(data: any) {
        let dialogRef: MatDialogRef<TransactiondetailComponent>;
        dialogRef = this.dialog.open(TransactiondetailComponent, { panelClass: 'custom-dialog-container-transactiondetail' });        
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }


    PopUpAdminTransaction(data: any) {
        let dialogRef: MatDialogRef<TransactionComponent>;
        dialogRef = this.dialog.open(TransactionComponent, { panelClass: 'custom-dialog-container-transaction' });        
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    PopUpTransaccionCancelResponse(data: any) {
        let dialogRef: MatDialogRef<TransactionresponseComponent>;
        dialogRef = this.dialog.open(TransactionresponseComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    setCancelTransaction(id_tx:number, jsonObjCancel:any) {        
        const body = JSON.stringify(jsonObjCancel);
        return this.httpClient.put(`${this.baseCancelTransactionFrontUrl}${id_tx}/`, body, { headers: this.getAuthHeaders() });
    }

    setContraTransaction(id_tx:number, jsonObjCancel:any) {        
        const body = JSON.stringify(jsonObjCancel);
        return this.httpClient.put(`${this.basesetContraTransactionFrontUrl}${id_tx}/`, body, { headers: this.getAuthHeaders() });
    }

    setAssistedSelling(requestData:any) {                
        const body = JSON.stringify(requestData);
        return this.httpClient.post(`${this.baseAssistedSellingFrontUrl}`, body, { headers: this.getAuthHeaders() });
    }
    

    ListTransactionByStore(id_store:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListTransactionsByStoreFrontUrl}?id_store=${id_store}`, { headers: this.getAuthFrontHeaders() });
        return invDetail;
    }

    GetTransactionById(idTransaction:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListTransactionsByIdFrontUrl}?id=${idTransaction}`, { headers: this.getAuthFrontHeaders() });
        return invDetail;
    }

    // Ivoice Apis
    ListAllInvoices() {
        let identifiersList: any;
        identifiersList = this.httpClient.get(this.baseListInvoicesFrontUrl, { headers: this.getAuthHeaders() });
        return identifiersList;
    }

    ListInvoicesByStore(id_store:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListInvoicesByStoreFrontUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }


    GetBalanceAccount(id_store:number) {
        let BalanceStore: any;
        BalanceStore = this.httpClient.get(`${this.baseGetBalanceAccountFrontUrl}?id_store=${id_store}`, { headers: this.getAuthFrontHeaders() });
        return BalanceStore;
    }

    getBalanceDetail(id_store:number) {
        let balanceDetail: any;
        balanceDetail = this.httpClient.get(`${this.baseGetBalanceDetailAccountFrontUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return balanceDetail;
    }

    GetTransferData(id_transfe:number) {
        let TransfeData: any;
        TransfeData = this.httpClient.get(`${this.baseGetTransferDataFrontUrl}?id_transfe=${id_transfe}`, { headers: this.getAuthFrontHeaders() });
        return TransfeData;
    }

    ListInvoicesByUser(id_user:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListInvoicesByUserFrontUrl}?id_user=${id_user}`, { headers: this.getAuthFrontHeaders() });
        return invDetail;
    }

    ListInvoicesById(id_invoice:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListHeaderInvoiceFrontUrl}?invoice_id=${id_invoice}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }

    getInvoiceDetail(id_invoice:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseListDetailInvoicesFrontUrl}?id_invoice=${id_invoice}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }
    getBinnacle(id:number, type:any){
        let listBinnacles: any;
        listBinnacles = this.httpClient.get(`${this.baseListBinnacles}?id=${id}&type=${type}`, { headers: this.getAuthHeaders() });
        return listBinnacles
    }
    createBinnacle(data:any){
        const body = JSON.stringify(data);
        return this.httpClient.post(`${this.baseCreateBinnacle}`,body, { headers: this.getAuthHeaders() });

    }

    getBinnacleNumber(id:number, type:any){
        let listBinnacles: any;
        listBinnacles = this.httpClient.get(`${this.baseListBinnaclesNumber}?id=${id}&type=${type}`, { headers: this.getAuthHeaders() });
        return listBinnacles
    }

    getInvoiceUserDetail(reference:any) {        
        let invDetailUsr: any;
        invDetailUsr = this.httpClient.get(`${this.baseListDetailInvoicesUserFrontUrl}?reference=${reference}`, { headers: this.getAuthFrontHeaders() });    
        return invDetailUsr;
    }

    PopUpInvoiceDetail(data: any) {
        let dialogRef: MatDialogRef<InvoicedetailusrComponent>;
        dialogRef = this.dialog.open(InvoicedetailusrComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    PopUpBalanceDetail(data: any) {
        let dialogRef: MatDialogRef<InvoicedetailComponent>;
        dialogRef = this.dialog.open(InvoicedetailComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    PopUpBinnacle(data: any) {
        let dialogRef: MatDialogRef<BinnancleComponent>;
        dialogRef = this.dialog.open(BinnancleComponent, { panelClass: 'custom-dialog-container-observation' });        
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    PopUpInvoiceDetailUsr(data: any) {
        let dialogRef: MatDialogRef<InvoicedetailusrComponent>;
        dialogRef = this.dialog.open(InvoicedetailusrComponent);
        dialogRef.componentInstance.data = data;
        return dialogRef.afterClosed();
    }

    UpdateStatusInvoice(InvoiceData:any, id_invoice:number){
        const body = JSON.stringify(InvoiceData);
        return this.httpClient.put(`${this.baseUpdateInvoiceStatusFrontUrl}${id_invoice}/`, body, { headers: this.getAuthHeaders() });
    }

    UpdateCheckCallControllInvoice( InvoiceData:any, id_invoice:number){
        const body = JSON.stringify(InvoiceData); 
        return this.httpClient.put(`${this.baseUpdateCheckCallControllFrontUrl}${id_invoice}/`, body, { headers: this.getAuthHeaders() });
    }

    UpdateCheckRecordInvoice( InvoiceData:any, id_invoice:number){
        const body = JSON.stringify(InvoiceData); 
        return this.httpClient.put(`${this.baseUpdateCheckRecordFrontUrl}${id_invoice}/`, body, { headers: this.getAuthHeaders() });
    }

    UpdateCheckShipmentInvoice( InvoiceData:any, id_invoice:number){
        const body = JSON.stringify(InvoiceData); 
        return this.httpClient.put(`${this.baseUpdateCheckShipmentFrontUrl}${id_invoice}/`, body, { headers: this.getAuthHeaders() });
    }

    UpdateCheckFinalyInvoice( InvoiceData:any, id_invoice:number){
        const body = JSON.stringify(InvoiceData); 
        return this.httpClient.put(`${this.baseUpdateCheckFinalyFrontUrl}${id_invoice}/`, body, { headers: this.getAuthHeaders() });
    }
    
    getCheckValidation(id_invoice:number, checkToValidate:number) {
        let invDetail: any;        
        invDetail = this.httpClient.get(`${this.baseCheckoutInvoiceFrontUrl}?id_invoice=${id_invoice}&check_validate=${checkToValidate}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }

    UpdateShippingVoucherInvoice(requestData:any) {
        return this.httpClient.post<any>(`${this.baseUpdateShippingVoucherInvoiceFrontUrl}`, requestData, { headers: this.getAuthFrontHeadersFormData() });
    }

    UpdateLetterReceivedInvoice(requestData:any) {
        return this.httpClient.post<any>(`${this.baseUpdateLetterReceivedInvoiceFrontUrl}`, requestData, { headers: this.getAuthFrontHeadersFormData() });
    }

    getInvoiceInProcess(id_store:number) {
        let invDetail: any;
        invDetail = this.httpClient.get(`${this.baseInvoiceProcesFrontUrl}?id_store=${id_store}`, { headers: this.getAuthHeaders() });
        return invDetail;
    }

    getBinnaclesCheck(id_invoice:number){
        let binnacleDetail: any;
        binnacleDetail = this.httpClient.get(`${this.baseBinnacleCheckFrontUrl}?id_invoice=${id_invoice}`, { headers: this.getAuthHeaders() });
        return binnacleDetail;
    }
    // Headers to autentication Api Payment Gateway
    getPaymentGatewayHeaders() {
        const tokenPaymentGateway = localStorage.getItem('TokenPaymentGateway');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenPaymentGateway}`
        });
    }


    // Headers to autentication user front
    getAuthFrontHeaders() {
        const token = localStorage.getItem('mr-token-front');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        });
    }

    getAuthFrontHeadersFormData() {
        const token = localStorage.getItem('mr-token-front');
        return new HttpHeaders({
            // 'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        });
    }

    // Headers to autentication
    getAuthHeaders() {
        const token = localStorage.getItem('mr-token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
        });
    }

    // Headers to autentication
    getAuthHeadersToFormData() {
        const token = localStorage.getItem('mr-token');
        return new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`

        });
    }

    getDataExportableTransaction(data:any){
        const body = JSON.stringify(data);
        return this.httpClient.post(`${this.BaseDataExportableTransaction}`, body,{ headers: this.getAuthHeaders() });
    }
}
