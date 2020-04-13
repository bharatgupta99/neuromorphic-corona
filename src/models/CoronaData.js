class CoronaData {
  constructor(data) {
    if (data) {
      this.confirmed = data.name;
      this.deaths = data.name;
      this.recovered = data.name;
      this.active = data.name;
    } else {
      this.confirmed = null;
      this.deaths = null;
      this.recovered = null;
      this.active = null;
    }
  }
}

export default CoronaData;
