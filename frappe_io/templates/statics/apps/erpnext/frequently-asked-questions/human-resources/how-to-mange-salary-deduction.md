# How To Manage Salary Deduction?

In ERPNext, Salary Deduction is based on Leave Without Pay and not on Attendance. Attendance is just a log. 

If you want ERPNext to automatically deduct salary in case of Leave Without Pay, then you must check on the 'Reduce Earning For Leave Without Pay'box in the Earning Type and Deduction Type masters. The amount of pay cut is the proportion of LWP days divided by the total working days for the month (based on the Holiday List).

![Leave Without Pay](/assets/frappe_io/images/erpnext/faq-leave-without-pay.png)

If you don’t want ERPNext to manage LWP, just don’t click on LWP in any of the Earning Types and Deduction Types.

