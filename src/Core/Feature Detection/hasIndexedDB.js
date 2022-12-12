function hasIndexedDB() {
	if (window.indexedDB) {
		return true;
	} else return false;
}

export {hasIndexedDB};
