def repeat(times):
	def decor(func):
	    def wrapper(*args, **kwargs):
	            for _ in range(times):
	            	func(*args, **kwargs)

	    return wrapper
	return decor

@repeat(5)
def impr(a):
    print(a)

impr('Hello')