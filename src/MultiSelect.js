import React, { Component } from "react";

import "./MultiSelect.css";

import data from "./data.json";

import axios from "axios";

const URL = "http://localhost:3000/search";
const Chip = (props) => {
  return (
    <div style={styles.chip}>
      <p>{props.text}</p>
    </div>
  );
};

class Multiselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
      currentWord: "",
      dropDownData: [],
    };
  }

  onItemSelected = (item) => {
    let list = this.state.selectedList;
    list = [...list, item.text];
    this.setState({
      selectedList: list,
      currentWord: "",
      dropDownData: [],
    });
    this.updateList(item.text)
  };

  getList = async (val) => {
    if (val) {
      let list = await axios.get(URL + "?word=" + val);
      let data = list.data;
      this.setState({
        dropDownData: data,
      });
    } else {
      this.setState({
        dropDownData: [],
      });
    }
  };

  updateList = async (word) => {
    let list = await axios.post(URL, {
      word: word,
    });
  };

  render() {
    return (
      <div>
        <h1>CRM Search</h1>
        {
          this.state.selectedList && this.state.selectedList.length > 0 ? (
            <button onClick={(e) => {
              this.setState({
                selectedList :[],
                currentWord : "",
                dropDownData : []
              })
            }}>
              clear all
            </button>
          ) : null
        }

        <div style={styles.selectionChips}>
          {this.state.selectedList.map((e) => {
            return <Chip text={e} />;
          })}
          <input
            placeholder="Type something...."
            style={styles.inputele}
            type="text"
            name="inputtext"
            id="inputtext"
            value={this.state.currentWord}
            onChange={(e) => {
              let word = e.target.value;
              this.setState({
                currentWord: word,
              });
              this.getList(word);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && this.state.currentWord) {
                let word = this.state.currentWord;
                let list = this.state.selectedList;
                list = [...list, word];

                this.setState({
                  selectedList: list,
                  currentWord: "",
                  dropDownData: [],
                });
                this.updateList(word);
              }
            }}
          />
        </div>
        {this.state.dropDownData && this.state.dropDownData.length > 0 ? (
          <div style={styles.listheader}>
            {this.state.dropDownData.map((item) => {
              return (
                <button
                  key={item.text}
                  style={styles.listitem}
                  onClick={(e) => {
                    this.onItemSelected(item);
                  }}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

const styles = {
  selectionChips: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#dedede",
    padding: "1%",
    margin: "0 2% 0% 2%",
    "border-radius": "1em",
    "-moz-box-shadow": "3px 3px 5px 6px #ccc",
    "-webkit-box-shadow": "3px 3px 5px 6px #ccc",
    "box-shadow": "rgb(199 191 191) 9px 9px 9px 3px",
  },
  inputele: {
    border: 0,
    padding: "1%",
    flexGrow: 1,
    //width: "100%",
    "font-size": "100%",
    backgroundColor: "#dedede",
    outline: "none",
  },
  listheader: {
    display: "flex",
    flexDirection: "column",
    // padding: "0.5%",
    margin: "0 2% 0 2%",
    "border-radius": "1em",
    "-moz-box-shadow": "3px 3px 5px 6px #ccc",
    "-webkit-box-shadow": "3px 3px 5px 6px #ccc",
    "box-shadow": "rgb(199 191 191) 9px 9px 9px 3px",
  },

  listitem: {
    "font-size": "100%",
    border: 0,
    padding: "1%",
    //margin: "0 2% 0 2%",
  },
  chip: {
    margin: "3px",
    border: "dotted black 1px",
    padding: "0px 7px 0 7px",
    "background-color": "#b3ceb3",
    "border-radius": "18px",
  },

  shadow: {
    "-moz-box-shadow": "3px 3px 5px 6px #ccc",
    "-webkit-box-shadow": "3px 3px 5px 6px #ccc",
    "box-shadow": "3px 3px 5px 6px #ccc",
  },
};

export default Multiselect;
