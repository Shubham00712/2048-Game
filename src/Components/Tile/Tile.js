import './Tile.css';

function Tile(props){
    const color={
        2:"#f7e6b2",
        4:"#f2d784",
        8:"#FF5800",
        16:"#EB5912",
        32:"#f1a11e",
        64:"#ff0000",
        128:"#f0d06d",
        256:"#EBEF1D",
        512:"#FF9402",
        1028:"CDF009",
        2048:"#F4D03F",
        4096:"#F4D03F"
    }
    const tileNum=props.num
    return(
        <div style={{backgroundColor:color[tileNum]}} className={"tile "+(props.num===0?"invisible":"visible")}>
            <h4>{props.num}</h4>
        </div>
    )
}

export default Tile;