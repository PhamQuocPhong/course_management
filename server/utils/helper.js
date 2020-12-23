module.exports = {
    ObjectIsEmpty: (obj) => {
        return JSON.stringify(obj) == '{}'
    },

    calcPagination: (currentPage, itemPerPage) => {
		var skip = (currentPage - 1) * itemPerPage
		var limit = skip + itemPerPage;
		return {limit, skip}
	},

	calcPageCounts: (count, itemPerPage) => {
		var pageCounts = Math.ceil(count / itemPerPage);
		
		return pageCounts;
	},
}

