import React from "react"
import './App.css';
import todo from "./todo.js"
import {TextField, Button, Fab, List, ListItem, ListItemText,} from '@material-ui/core';
import {Edit, Delete} from "@material-ui/icons"


class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            value:"",

            flag:false
        }
    }

    add = () => {
        if (this.state.value !== ""){
            const object = { task: this.state.value}
            todo.push(object);
            this.setState({

                value: ""
            });
        }
    }

    updateData = (index ,value) => {
        todo[index].task = value
        todo[index].edit = false
        this.setState({ value: "" , flag:false});
    }

    editTodo = (index) => {
        if (this.state.flag === false){
            todo[index].edit = true
        this.setState({flag:true})
        }
        else {
            this.updateData(index, this.state.value)
        }
    }
    deleteTodo = (index)=>{
        todo.splice(index, 1)
        this.setState({value:""})
    }

    render() {
        // const classes = makeStyles((theme) => ({
        //         root: {
        //         width: '100px',
        //         maxWidth: 360,
        //         backgroundColor: theme.palette.background.paper,
        //     },
        // }));

        return(
            <div className="container" >

            <h1> ToDo Application</h1>
                <div>
                        <TextField className="text" id="outlined-basic" label="Enter Your Text" variant="outlined"  type="text"  value={this.state.value} onChange={(e)=>{this.setState({
                    value: e.target.value
                })}} />

                </div>
                <Button color={"primary"} variant="contained" size="large" onClick={this.add}>Add</Button>

                <List component="nav" aria-label="mailbox folders" >{
                    todo.map((item, index)=> {
                        return( <ListItem className="l2" divider><ListItemText className="l1" key={index}>{item.edit ?  <TextField  className="text" placeholder={item.task} onChange={(e)=>this.setState({value: e.target.value})} type='text' /> : item.task}
                        <Fab className="fa" color={"primary"} aria-label="edit" onClick={() => this.editTodo(index)}> <Edit/></Fab>
                                <Fab color="secondary" onClick={()=>this.deleteTodo(index)}><Delete/></Fab>
                        </ListItemText></ListItem>)

                    })
                }</List>

            </div>
        )
    }
}


export default App;
