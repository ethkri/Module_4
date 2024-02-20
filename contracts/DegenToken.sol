// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract degenToken {

    address public tokenOwner;
    string public tokenName;
    string public tokenSymbol;
    uint public itemCount = 0;

    struct Item {
        uint itemId;
        string itemName;
        uint256 itemPrice;
    }

    modifier onlyOwner() {
        require(msg.sender == tokenOwner, "You are not the Owner");
        _;
    }

    mapping(address => uint) public balances;

    Item[] public availableItems;

    uint256 public totalSupply;

    constructor(string memory _name, string memory _symbol, address _owner) {
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenOwner = _owner;
    }

    function mint(address receiver, uint amount) public onlyOwner {
        balances[receiver] += amount;
        totalSupply += amount;
    }

    function burn(uint256 amount) public {
        require(balances[msg.sender] >= amount, "You don't have enough tokens to burn");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
    }

    function transfer(address receiver, uint256 amount) public {
        require(balances[msg.sender] >= amount, "You don't have enough tokens to transfer");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }

    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }

    function addItem(string memory _name, uint256 _price) public onlyOwner {
        Item memory newItem = Item(itemCount, _name, _price);
        availableItems.push(newItem);
        itemCount += 1;
    }

    function getItems() public view returns (Item[] memory) {
        return availableItems;
    }

    function redeemItem(uint _itemId) public {
        uint price = availableItems[_itemId].itemPrice;
        require(balances[msg.sender] >= price, "You don't have enough Tokens");
        balances[msg.sender] -= price;
        balances[tokenOwner] += price;
    }
}
