function Library() {
	this.library = [];
	this.book_count = 0;
}

Library.prototype.all = function() {
	return this.library;
}

Library.prototype.add = function(book) {
	return this.library.push({
		id: this.book_count += 1,
		book: book
	});
}

Library.prototype.show = function(id) {
	for (var i = 0; i < this.library.length; i++) {
		if (this.library[i].id === id) {
			return this.library[i];
		}
	}
}

Library.prototype.remove = function(id) {
	for (var i = 0; i < this.library.length; i++) {
		if (this.library[i].id === id) {
			return this.library.splice(i, 1);
		}
	}
}

module.exports = Library;