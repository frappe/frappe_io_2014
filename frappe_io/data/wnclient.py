import requests
import json

class AuthError(Exception):
	pass

class WNException(Exception):
	pass


class WNClient(object):

	def __init__(self, url, username, password):
		self.session = requests.Session()
		self.url = url
		self.login(username, password)

	def __enter__(self):
		return self

	def __exit__(self, *args, **kwargs):
		self.logout()

	def login(self, username, password):
		r = self.session.post(self.url, data={
			'cmd': 'login',
			'usr': username,
			'pwd': password
		})

		if r.json().get('message') == "Logged In":
			return r.json()
		else:
			raise AuthError

	def logout(self):
		self.session.get(self.url, params={
			'cmd': 'logout',
		})

	def insert(self, doclist):
		return self.post_request({
			"cmd": "webnotes.client.insert",
			"doclist": json.dumps(doclist)
		})
		
	def update(self, doclist):
		return self.post_request({
			"cmd": "webnotes.client.save",
			"doclist": json.dumps(doclist)
		})

	def bulk_update(self, docs):
		return self.post_request({
			"cmd": "webnotes.client.bulk_update",
			"docs": json.dumps(docs)
		})

	def delete(self, doctype, name):
		return self.post_request({
			"cmd": "webnotes.model.delete_doc",
			"doctype": doctype,
			"name": name
		})
		
	def submit(self, doclist):
		return self.post_request({
			"cmd": "webnotes.client.submit",
			"doclist": json.dumps(doclist)
		})
	
	def set_value(self, doctype, docname, fieldname, value):
		return self.post_request({
			"cmd": "webnotes.client.set_value",
			"doctype": doctype,
			"name": docname,
			"fieldname": fieldname,
			"value": value
		})

	def cancel(self, doctype, name):
		return self.post_request({
			"cmd": "webnotes.client.cancel",
			"doctype": doctype,
			"name": name
		})
		
	def get_doc(self, doctype, name=None, filters=None):
		params = {
			"cmd": "webnotes.client.get",
			"doctype": doctype,
		}
		if name:
			params["name"] = name
		if filters:
			params["filters"] = json.dumps(filters)
		ret = self.get_request(params)
		return ret

	def rename_doc(self, doctype, old_name, new_name):
		params = {
			"cmd": "webnotes.client.rename_doc",
			"doctype": doctype,
			"old_name": old_name,
			"new_name": new_name
		}
		return self.post_request(params)

	def get_request(self, params):
		res = self.session.get(self.url, params=params)
		res = self.post_process(res)
		return res

	def post_request(self, data):
		res = self.session.post(self.url, data=data)
		res = self.post_process(res)
		return res
	
	def post_process(self, response):
		if response.json() and ("exc" in response.json()) and response.json()["exc"]:
			raise WNException(response.json()["exc"])
		return response.json()['message']