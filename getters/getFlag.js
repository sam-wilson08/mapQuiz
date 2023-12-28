

async function getFlag() {
    try {
      const randomNumber = Math.floor(
        Math.random() * this.countryNamesArray.length
      );
      this.randomFlag = this.countryNamesArray[randomNumber];

      const response = await fetch(
        `https://restcountries.com/v3.1/name/${this.randomFlag}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Data:", data[0].flags.png);
      this.questionFlag = data[0].flags.png;
      const filteredArray = this.countryNamesArray.filter(country => country !== this.randomFlag); // Filter out the number 3
      console.log(filteredArray);

      this.countryNamesArray = filteredArray

      // Perform actions with the data here
    } catch (error) {
      // Handle errors that may occur during the fetch
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  export { getFlag}


