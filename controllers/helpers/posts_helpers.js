module.exports.handlePublishedQuery = (req, res, next) => {
  const { published } = req.query;
  const isPublished = published ? published.toLowerCase() : undefined;

  if (!req.isAuthenticated()) {
    req.query.published = true;
  } else if (isPublished === 'true') {
    req.query.published = true;
  } else if (isPublished === 'false') {
    req.query.published = false;
  } else {
    req.query.published = undefined;
  }

  next();
};

const handleDateQuery = (req, next, date) => {
  const dateObject = new Date(req.query[date]);

  if (Number.isNaN(dateObject.getTime())) {
    req.query[date] = undefined;
  } else {
    req.query[date] = dateObject;
  }

  next();
};

module.exports.handleCreatedFromDateQuery = (req, res, next) => {
  handleDateQuery(req, next, 'created_from_date');
};

module.exports.handleCreatedToDateQuery = (req, res, next) => {
  handleDateQuery(req, next, 'created_to_date');
};

module.exports.handleUpdatedFromDateQuery = (req, res, next) => {
  handleDateQuery(req, next, 'updated_from_date');
};

module.exports.handleUpdatedToDateQuery = (req, res, next) => {
  handleDateQuery(req, next, 'updated_to_date');
};

module.exports.handleSortQuery = (req, res, next) => {
  const sortString = req.query.sort;

  if (sortString) {
    const sort = {};

    sortString.split(',').forEach((sortOption) => {
      const [order, field] = [sortOption[0], sortOption.slice(1)];

      sort[field] = order === '-' ? -1 : 1;
    });

    req.query.sort = sort;
  }

  next();
};

module.exports.handlePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page && limit) {
    req.query.page = parseInt(page, 10);
    req.query.limit = parseInt(limit, 10);
  }

  next();
}
