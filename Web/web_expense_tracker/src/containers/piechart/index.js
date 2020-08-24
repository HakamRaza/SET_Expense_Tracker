import React from 'react';
import './piechart.css';
import Drawer from '../../components/drawer';
import SumCard from '../../components/sumCard';
import SumCardBar from '../../components/sumCardBar';
import Form from 'react-bootstrap/Form';
import { VictoryPie} from 'victory';

const sumData =[
    {
        type:"Remaining Budget",
        left: 5000,
        total: 9000,
    },

    {
        type:"Current Expenses",
        total: 5000,
    },

    {
        type: "Accrued Savings",
        total: 3987.05,
    },
]

export default class PieChart extends React.Component{
    render(){
        return(
            <div className="pipg-cont">
                <Drawer />

                <h3>Monthly Overview</h3>

                <div>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Month :</Form.Label>
                        <Form.Control as="select">
                            <option>Jan 2020</option>
                            <option>Feb 2020</option>
                            <option>Mac 2020</option>
                            <option>Apr 2020</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className="pipg-holder">
                    <div>
                        <div className="piepg-pie">
                            <VictoryPie
                            style={{data: {stroke: "black", strokeWidth: 2},}}
                            // innerRadius={110}
                            colorScale={["white","#005086", "green"]}

                            data={[
                                { x: "Test", y: 50},
                                { x: "Test 2", y: 50 },
                                { x: "Test 3", y: 30 },
                            ]}

                            animate={{
                                duration: 2000
                            }}
                            />
                        </div>
                    </div>


                </div>

                <div className="pipg-sum2">
                    <SumCardBar title={sumData[0].type} left={sumData[0].left} total={sumData[0].total} percent={(sumData[0].left/ sumData[0].total*100)}/>
                    <SumCard type='1' title={sumData[1].type} total={sumData[1].total}  />
                    <SumCard type='2'title={sumData[2].type} total={sumData[2].total}  />
                </div>
                
            </div>
        );
    }
}