import mysql.connector

cnx = mysql.connector.connect(database="competition", user="root", password="", host="localhost")
cursor = cnx.cursor(buffered = True)

ply = '2'
qst = '1'

query = f"INSERT INTO answers VALUES ({int(ply)}, {int(qst)}, (SELECT bk.level FROM books bk INNER JOIN questions qst ON qst.bkID = bk.bkID WHERE qst.qstID = {qst}))"

try:
	cursor.execute(query)
	print("Executed")
except:
	print("Error")

cnx.commit()