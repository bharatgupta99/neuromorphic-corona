class Country {
  constructor(data) {
    if (data) {
      this.name = data.name;
      this.code = data.code;
    } else {
      this.name = null;
      this.code = null;
    }
  }
}

export default Country;
