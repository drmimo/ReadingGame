import eel, mysql.connector as Connector

cnx = Connector.connect(host="localhost", user="root", password="", database="competition")
cur = cnx.cursor(buffered=True)

@eel.expose
def loadBooksList():
	query = "SELECT * FROM books WHERE 1"
	cur.execute(query)
	result = cur.fetchall()
	return result

@eel.expose
def insert_book(data):
	query = f"INSERT INTO books (bkTitle, author, pages, level, coverPic) VALUES( '{data[0]}', '{data[1]}', {data[2]}, {data[3]}, '{data[4]}')"
	print(query)
	try:
		cur.execute(query)
		print('Book had been inserted correctly')
		cnx.commit()
	except:
		print('We had a problem while trying to insert the book')

@eel.expose
def insert_question(data):
	query= f"INSERT INTO questions (bkID, qstTxt, suggest1, suggest2, suggest3, suggest4, correct) VALUES({data[0]}, '{data[1]}', '{data[2]}', '{data[3]}', '{data[4]}', '{data[5]}', '{data[6]}')"
	#print(query)
	try:
		cur.execute(query)
		print('Question had been added correctly')
		cnx.commit()
	except:
		print("We faced a problem while trying to put questions inside")

@eel.expose
def update_book(data):
	query = f"UPDATE books SET bkTitle = '{data[1]}', author = '{data[2]}', pages = {data[3]}, level ={data[4]}, coverPic = '{data[5]}' WHERE bkID = {data[0]}"
	try:
		cur.execute(query)
		cnx.commit()
	except:
		print('Somthing wrong happened while trying to update book infos in database')

@eel.expose
def load_book(bkID):
	query = f"SELECT bkTitle, author, pages, level, coverPic FROM books WHERE bkID = {bkID}"
	cur.execute(query)
	book_infos = cur.fetchone()
	return book_infos


eel.init('./')
eel.start('index.html')
