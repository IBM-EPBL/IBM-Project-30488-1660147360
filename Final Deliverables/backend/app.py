import ibm_db
from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
global conn
try: 
    conn = ibm_db.connect('DATABASE=bludb;HOSTNAME=fbd88901-ebdb-4a4f-a32e-9822b9fb237b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=32731;SECURITY=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=tlf61984;PWD=YzQTBi0YTDdpMivp', '', '')
    print("conn success")
except:
    print("conn error ")

@app.route("/login" ,methods=['POST'])
@cross_origin()
def login():
    email = request.form['email']
    password = request.form['password']
    stmt = ibm_db.exec_immediate(conn,"Select password,shopname from TLF61984.users where email='"+email+"'")
    result = {"message":"fail","shopname":""}
    if ibm_db.fetch_row(stmt) != False and ibm_db.result(stmt,0)==password:
        result["message"] = "success"
        result["shopname"] = ibm_db.result(stmt,1)
    print(result)
    return result

@app.route("/signup", methods=['POST'])
@cross_origin()
def signup():
    result = {}
    email = request.form['email']
    if mailExists(email):
        result["message"] = "fail" 
    else:
        insert = "insert into TLF61984.users(name,email,password,shopname) values('"+request.form['name']+"','"+request.form['email']+"','"+request.form['password']+"','"+request.form['shopname']+"')"
        ibm_db.exec_immediate(conn,insert)
        result["message"] = "success"
    return result

def mailExists(email):
    result = False
    stmt = ibm_db.exec_immediate(conn,"Select userid from TLF61984.users where email='"+email+"'")
    if ibm_db.fetch_row(stmt) != False:
        result = True
    return result

@app.route("/getstocks", methods=['POST'])
@cross_origin()
def getstocks():
    stocks = []
    useremail = request.form['useremail']
    print(useremail)
    stmt = ibm_db.exec_immediate(conn,"Select * from TLF61984.stock where useremail='"+useremail+"'")
    while ibm_db.fetch_row(stmt) != False:
        stock = {}
        stock["stockid"] = ibm_db.result(stmt,0)
        stock["name"] = ibm_db.result(stmt,1)
        stock["quantity"] = ibm_db.result(stmt,2)
        stock["minvalue"] = ibm_db.result(stmt,3)
        stock["price"] = ibm_db.result(stmt,4)
        stock["category"] = ibm_db.result(stmt,5)
        stock["useremail"] = ibm_db.result(stmt,6)
        stocks.append(stock)
    return stocks


@app.route("/addstock", methods=['POST'])
@cross_origin()
def addstock():
    result = {}
    name = request.form['name']
    useremail = request.form['useremail']
    insert = "insert into TLF61984.stock(name,quantity,minvalue,price,category,useremail) values('"+name+"',"+request.form['quantity']+","+request.form['minvalue']+","+request.form['price']+",'"+request.form['category']+"','"+useremail+"')"
    ibm_db.exec_immediate(conn,insert)
    result["message"] = "Stock Created SuccessFully"
    return result

@app.route("/deletestock", methods=['POST'])
@cross_origin()
def deletestock():
    result = {}
    stockid = request.form['stockid']
    ibm_db.exec_immediate(conn,"delete from TLF61984.stock where stockid="+stockid)
    result["message"] = "Stock deleted SuccessFully" 
    return result

@app.route("/updatestock", methods=['POST'])
@cross_origin()
def updatestock():
    result = {}
    stockid = request.form['stockid']
    name = request.form['name']
    ibm_db.exec_immediate(conn,"update TLF61984.stock set name='"+name+"',quantity="+request.form['quantity']+",minvalue="+request.form['minvalue']+",price="+request.form['price']+",category='"+request.form['category']+"' where  stockid="+stockid)
    result["message"] = "Stock updated SuccessFully"
    return result
