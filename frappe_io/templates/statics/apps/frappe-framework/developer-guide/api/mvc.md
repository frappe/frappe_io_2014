# MVC (Bean)

> This page is work in progress

A quick primer on how to work with models in Frappe. Lets start with a few definitions:

1. Document: A dict like object with a basic ORM. No triggers, controllers attached.
1. DocType: A class of Document. Every document has a `doctype` property