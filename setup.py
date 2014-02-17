from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='frappe_io',
    version=version,
    description='Community portal for Frappe',
    author='Web Notes Technologies Pvt Ltd',
    author_email='info@erpnext.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
