import eel, mysql.connector as Connector

cnx =  Connector.connect(host="localhost", user="root", password="", database="competition")
cursor = cnx.cursor(buffered= True)
actualPlayer = None
actualBook = None

@eel.expose
def get_actual_player():
	return get_player(actualPlayer)

@eel.expose
def get_actual_book():
	query = f"SELECT * FROM books WHERE bkID = {actualBook}"
	cursor.execute(query)
	result = cursor.fetchone()
	return result

@eel.expose
def set_actual_player(ID):
	global actualPlayer
	actualPlayer = ID
	print("Player N°:", ID, "is playing now")

@eel.expose
def set_actual_book(ID):
	global actualBook
	actualBook = ID
	print("Book N°:", ID, "has been chosen now")

@eel.expose
def get_book_level():
	query = f"SELECT bkID, level FROM books WHERE bkID = {actualBook}"
	cursor.execute(query)
	result = cursor.fetchone()
	return result

@eel.expose
def get_questions():
	query = f"SELECT * FROM questions WHERE bkID = {actualBook}"
	cursor.execute(query)
	result = cursor.fetchall()
	return result

@eel.expose
def get_player(plyID):
	query = f"SELECT * from players WHERE plyID = {plyID}"
	#print("The query", query)
	cursor.execute(query)
	result = cursor.fetchone()
	return result

@eel.expose
def get_book(bkID):
	first_query = f"SELECT * FROM answers ans INNER JOIN questions qst ON ans.qst = qst.qstID WHERE qst.bkID = {bkID} AND ans.plyID = {actualPlayer}"
	cursor.execute(first_query)
	if_has_read = cursor.fetchall()

	if if_has_read:
		return None
	else:
		query = f"SELECT * FROM books WHERE bkID = {bkID}"
		#print("The query: ",query)
		cursor.execute(query)
		result = cursor.fetchone()
		return result

@eel.expose
def store_answers(qstID, chosen, correct):
	if chosen == correct:
		query = f"INSERT INTO answers VALUES ({int(actualPlayer)}, {int(qstID)}, (SELECT bk.level FROM books bk INNER JOIN questions qst ON qst.bkID = bk.bkID WHERE qst.qstID = {int(qstID)}))"
		#print(query)
		try:
			cursor.execute(query)
			print("Score inserted correctly")
			cnx.commit()
		except:
			print("Something wrong happened")
	else:
		try:
			cursor.execute(f"INSERT INTO answers VALUES ({actualPlayer}, {qstID}, 0)")
			cnx.commit()
		except:
			print("Something went wrong")

@eel.expose
def compute_score():
	query = f"SELECT ans.plyID, ply.plyName, CONVERT(sum(score), INT) AS scores FROM answers ans INNER JOIN players ply ON ply.plyID = ans. plyID WHERE ans.plyID = {actualPlayer} AND ans.qst IN (SELECT qst.qstID FROM questions qst INNER JOIN  books bk ON bk.bkID = qst.bkID WHERE bk.bkID = {actualBook})"
	#print(query)
	cursor.execute(query)
	result = cursor.fetchone()
	#print(result)
	return result

@eel.expose
def count_books_total():
	query = f"SELECT CONVERT(sum(scores), INT) as total_s, count(bkID) FROM (SELECT *, sum(score) as scores FROM answers ans INNER JOIN questions qst ON ans.qst = qst.qstID WHERE ans.plyID = {actualPlayer} group by qst.bkID) AS result"
	cursor.execute(query)
	stats = cursor.fetchone()
	return stats

@eel.expose
def get_v_x():
	query = f"SELECT count(ans.score) FROM answers ans INNER JOIN questions qst ON qst.qstID = ans.qst WHERE qst.bkID = {actualBook} AND ans.plyID = {actualPlayer} GROUP BY ans.score ORDER BY score DESC"
	cursor.execute(query)
	stats = cursor.fetchall()
	return stats

@eel.expose
def get_sorted_scores():
	query = f"SELECT ans.plyID, ply.plyName, CONVERT(SUM(score), INT) as points FROM answers ans INNER JOIN players ply ON ply.plyID = ans.plyID GROUP BY plyID ORDER BY `points` DESC"
	cursor.execute(query)
	points = cursor.fetchall()
	return points


eel.init("www")
eel.start('finals.html')
