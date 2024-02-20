// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.9;

contract degenToken{

    address public owner;
    string public name;
    string public symbol;
    uint public itemID = 0;

    struct items{

        uint id;
        string itemName;
        uint256 price;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the Owner");
        _;
    }

    mapping (address => uint) public balances;

    items[] public redeem_items;
 
    uint256 public totalSupply;


    constructor(string memory _name, string memory _symbol, address _owner){

        name = _name;
        symbol = _symbol;
        owner = _owner;

    }

    function mint(address reciever, uint amount)
    public
    onlyOwner() {

        balances[reciever] += amount;
        totalSupply += amount;

    }

    function burn(uint256 amount)
    public{

        require(balances[msg.sender] >= amount , "You don't have enough tokens to burn");
        balances[msg.sender] -= amount;
        totalSupply -= amount;

    }

    function transfer(address reciever, uint256 amount)
    public{

        require(balances[msg.sender] >= amount , "You don't have enough tokens to transfer");
        balances[msg.sender] -= amount;
        balances[reciever] += amount;

    }

    function getBalance(address _address)
    public
    view
    returns(uint256){
        return balances[_address];
    }

    function addItems(string memory _name, uint256 _amount)
    public onlyOwner{

        items memory item =  items( itemID, _name, _amount);
        redeem_items.push(item);
        itemID += 1;
    }

    function getItems() public view returns(items[] memory){

        return redeem_items;

    }

    function redeemToken(uint  _id)
    public {

        uint price = redeem_items[_id].price;

        require (balances[msg.sender] >= price, "You don't have enough Tokens");
        balances[msg.sender] -= price;
        balances[owner] += price;

    }
    

}