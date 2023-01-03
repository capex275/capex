# -*- coding: utf-8 -*-
# from odoo import http


# class CrmCapex(http.Controller):
#     @http.route('/crm_capex/crm_capex', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/crm_capex/crm_capex/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('crm_capex.listing', {
#             'root': '/crm_capex/crm_capex',
#             'objects': http.request.env['crm_capex.crm_capex'].search([]),
#         })

#     @http.route('/crm_capex/crm_capex/objects/<model("crm_capex.crm_capex"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('crm_capex.object', {
#             'object': obj
#         })
