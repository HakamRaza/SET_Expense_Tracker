import React from 'react';
import './categories.css';
import Actions from '../../actions';
import { connect } from "react-redux";


import Drawer from '../../components/drawer';
// import CategoriesCard from '../../components/categoriesCard';

// import { IconContext } from "react-icons";
// import Modal from '../../components/modal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { IoIosTrash, IoMdCreate, IoMdAlbums } from "react-icons/io";
import { Alert } from 'react-bootstrap';


const sumCat = [
    {
        name:"Food",
        budget: 800,
        totalexpense: 400,
        color:"lightblue",
    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"lightblue",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"lightcoral",

    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"lightgreen",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"lightcoral",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"lightsalmon",

    },

    {
        name:"Drinks & Boba",
        budget: 300,
        totalexpense: 150,
        color:"yellow",

    },

    {
        name:"House Bills",
        budget: 100,
        totalexpense: 0,
        color:"limegreen",

    },

    {
        name:"Savings",
        budget: 900,
        totalexpense: 302.04,
        color:"limegreen",

    },
]


class Category extends React.Component{
    constructor(){
        super();

        this.state={
            itemID:"",
            category_title:"",
            category_budget:"",
            category_color:"",

            currentMonth:"",
            currentYear:"",

            showModalDelete:false,
            showModalUpdate:false,
            showModalAdd:false,

            ModalAlert:false,
            modalTitleAlert:"",
            modalMsgAlert:"",

            barsData:[],
        }
    }

    componentDidMount(){
        const d = new Date();
        const yr = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        // const dt = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        // const today = `${yr}-${mo}-${dt}`;

        this.setState({
            currentMonth: mo,
            currentYear: yr,
            // currentDay: today,
        }, () => {
            
            //callback function
            this._onGetCategoriesBar();
            // this._onGetMonthlyOverview();
            // this._onGetLatestTransaction();
        });

    }

    componentDidUpdate(prevProps){
        
        // console.log("this is component did update");
        
        const { getBarsData, delCategoryData} = this.props;
        
        if(prevProps.getBarsData.isLoading && !getBarsData.isLoading){
            
            if(getBarsData.data.status === "success") {
                
                this.setState({barsData: getBarsData.data.barsData});
                
                
            } else if (getBarsData.error !== null){
                
                this.setState({
                    showModalAlert:true,
                    modalTitleAlert: "Failed",
                    modalMsgAlert:"Failed to fetch Categories Bar List. Please Try Again",
                });
            }
        }

        // if(prevProps.delCategoryData.isLoading && !delCategoryData.isLoading){
            
        //     if(delCategoryData.data.status === "success") {
                
        //         this.setState({
        //             showModalAlert:true,
        //             modalTitleAlert: "Success",
        //             modalMsgAlert:"One Category Deleted.",
        //         });
                
                
        //     } else if (delCategoryData.error !== null){
                
        //         this.setState({
        //             showModalAlert:true,
        //             modalTitleAlert: "Failed",
        //             modalMsgAlert:"Failed to fetch Delete Category. Please Try Again",
        //         });
        //     }
        // }
    }

    _confirmation(selectID, id){
        
        const itemID = id;
        this.setState({itemID:itemID});

        switch (selectID) {
            case "update":
                this.setState({showModalUpdate:true});
                // this.setState({showModalUpdate:true});

            break;
            
            case "delete":
                this.setState({showModalDelete:true});
                // this.setState({showModalDelete:true,});
            break;

            case "add":
                this.setState({showModalAdd:true});
                // this.setState({showModalDelete:true,});
            break;
            
            default:
                break;
        }
    }

    
    _delCategories(){
        console.log("Delete a Category");
        console.log(this.state.itemID);
        this.props.onDeleteCategory(this.state.itemID);
        // this.setState({showDelCat:true});
        
    }
    
    _editCategories(){
        console.log("Edit a Category");
        console.log(this.state.itemID);
        // this.setState({showEditCat:true});
    }
    
    _addCategories(){
        console.log("Add more Categories");
        // this.setState({showAddMore:true});
    }

    _onGetCategoriesBar(){
        const { currentMonth, currentYear} = this.state;

        const formData = {
            month: currentMonth,
            year : currentYear,
        }

        this.props.onGetBarsData(formData);
    }

    render(){
        return(
            <div>
                <Drawer/>
                {this.state.showModalAlert && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalAlert:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modalTitleAlert}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.modalMsgAlert}</Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={()=>this.setState({showModalAlert:false})}>OK</Button>
                        </Modal.Footer>
                    </Modal>
                </div>)}

                {this.state.showModalDelete && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalDelete:false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Category :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Delete this Category? <i>(This will affect your total expenses and saving calculation)</i></Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>this.setState({showModalDelete:false})}>Close</Button>
                            <Button variant="danger" onClick={()=>this._delCategories()}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </div>)}

                {this.state.showModalUpdate && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalUpdate:false})}>
                        <Modal.Header closeButton>
                        <Modal.Title>Update Category :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="updateTitle">
                                <Form.Label>Description :</Form.Label>
                                <Form.Control required size="sm" type="text" pattern=".{1,10}" placeholder="Max 10 Chars"/>
                            </Form.Group>

                            <Form.Group controlId="updateBudget">
                                <Form.Label>Budget (RM) :</Form.Label>
                                <Form.Control required size="sm" type="number" min="0" step="0.01" placeholder="Budget Value" />
                            </Form.Group>

                            <Form.Group controlId="updateColor">
                            <Form.Label>Color Selection :</Form.Label>
                            <Form.Control required size="sm" as="select">
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                {/* {this.state.getCategories.map( item=>(
                                    <option value={item.id}>{item.category_title}</option>
                                ))} */}
                            </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="secondary" onClick={()=>this.setState({showModalUpdate:false})}>Close</Button>
                            <Button variant="success" onClick={()=>this._editCategories()}>Save</Button>
                        
                        </Modal.Footer>
                    </Modal>
                </div>)}
                {this.state.showModalAdd && (
                    <div>
                    <Modal centered show={true} onHide={()=>this.setState({showModalAdd:false})}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Category :</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="updateTitle">
                                <Form.Label>Title:</Form.Label>
                                <Form.Control required size="sm" type="text" pattern=".{1,10}" placeholder="Max 10 Chars"/>
                            </Form.Group>

                            <Form.Group controlId="updateBudget">
                                <Form.Label>Budget (RM) :</Form.Label>
                                <Form.Control required size="sm" type="number" min="0" step="0.01" placeholder="Budget Value" />
                            </Form.Group>

                            <Form.Group controlId="updateColor">
                            <Form.Label>Color Selection :</Form.Label>
                            <Form.Control required size="sm" as="select">
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                <option>Color</option>
                                {/* {this.state.getCategories.map( item=>(
                                    <option value={item.id}>{item.category_title}</option>
                                ))} */}
                            </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="secondary" onClick={()=>this.setState({showModalAdd:false})}>Close</Button>
                            <Button variant="primary" onClick={()=>this._addCategories()}>Add</Button>
                        
                        </Modal.Footer>
                    </Modal>
                </div>)}
                <div className="cat-cont">
                    <div className="cat-card-cont">
                        {this.state.barsData.map(item=>(
                        <div className="categ-card-cont">
                            <Card border="primary" style={{ width: '100%', marginTop:10, boxShadow:`5px 5px 0px ${item.color}`}}>

                                <Card.Body>
                                    <div style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                                        <Card.Title><b>{item.title} </b></Card.Title>
                                    </div>
                                    <div>
                                        <Card.Text>Budget: <b>$ {item.budget.toFixed(2)}</b></Card.Text>
                                        <Button variant="warning" size="sm" onClick={()=>this._confirmation("update", item.id)}><IoMdCreate/> Edit</Button>{' '}
                                        <Button variant="danger" size="sm" onClick={()=>this._confirmation("delete", item.id)}><IoIosTrash />Delete</Button>{' '}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        ))}

                        <div className="categ-card-cont">
                            <Card border="primary" style={{ width: '100%', marginTop:10, minHeight:147}}>
                                <Card.Body style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <Button variant="primary" size="md" onClick={()=>this._confirmation("add")}><IoMdAlbums /> Add More</Button>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    // deleteTransactionData: Actions.deleteTransactionData(store),
    getBarsData: Actions.getBarsData(store),
    delCategoryData: Actions.delCategoryData(store),
    //
    // getOverviewData: Actions.getOverviewData(store),
    // getTransactionData: Actions.getTransactionData(store),

});

const mapDispatchToProps = {
    // onDeleteTransaction: Actions.delete_transaction,
    onGetBarsData: Actions.get_bars,
    onDeleteCategory: Actions.delete_categories,
    // onGetOverviewData: Actions.get_overview,
    // onGetTransaction: Actions.get_transaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);