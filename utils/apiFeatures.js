class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(1);
    let queryStr = JSON.stringify(queryObj);
    console.log(2);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(2);

    return this;
    // mongodb find filter method
    // let query = Tour.find(JSON.parse(queryStr));
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      console.log(2);
    } else {
      // query = query.sort('-createdAt');
    }

    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); // not including __v
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // string to number
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
