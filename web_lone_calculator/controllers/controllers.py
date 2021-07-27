# -*- coding: utf-8 -*-
# from odoo import http


# class WebLoneCalculator(http.Controller):
#     @http.route('/web_lone_calculator/web_lone_calculator/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_lone_calculator/web_lone_calculator/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_lone_calculator.listing', {
#             'root': '/web_lone_calculator/web_lone_calculator',
#             'objects': http.request.env['web_lone_calculator.web_lone_calculator'].search([]),
#         })

#     @http.route('/web_lone_calculator/web_lone_calculator/objects/<model("web_lone_calculator.web_lone_calculator"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_lone_calculator.object', {
#             'object': obj
#         })
