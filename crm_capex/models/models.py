from odoo import api, fields, models

class capexcontact(models.Model):
    _name = 'res.partner'
    _inherit = 'res.partner'

    serial_number = fields.Text(string="serial number", required=False, )
    date = fields.Date(string="Date", required=False, )
    area_id = fields.Many2one(comodel_name="res.city", string="Area", required=False, )
    contact_name_person = fields.Text(string="Person", required=False, )
    deal_amount = fields.Monetary(string='Deal Amount', tracking=True)
    deal_status = fields.Selection(string="Deal Status", selection=[('current', 'Current'), ('new', 'New'), ], required=False, )
    Investments_in_millions = fields.Monetary(string='Investments In Millions', tracking=True)
    start_of_production = fields.Date(string="Start Of Production", required=False, )
    tax_tax_id = fields.Many2many('ir.attachment')