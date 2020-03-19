import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

interface SearchProps {
  onSearch: any;
}

class SearchBar extends Component<SearchProps> {
  state = {
    searchText: ""
  };

  handleSearchChange = searchText => {
    this.setState({ searchText });
  };

  handleSubmit = () => {
    console.log("clickeded");
    this.props.onSearch(this.state.searchText);
    this.setState({ searchText: "" });
  };

  render() {
    console.log(this.state.searchText);
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("dismissed keyboard");
          Keyboard.dismiss();
        }}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search for a plant"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            value={this.state.searchText}
            onChangeText={this.handleSearchChange}
            ref={this.state.searchText}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  searchButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});
