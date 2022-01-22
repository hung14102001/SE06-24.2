// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./BattleShipNFT.sol";
import "./AztecToken/AztecToken.sol";
import "./interfaces/IERC721.sol";

import "hardhat/console.sol";

contract Marketplace is Ownable {
    using SafeMath for uint256;
    using SafeMath for uint32;

    uint32 private _itemsSold;
    uint256 listingPrice;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() Ownable() {
        _itemsSold = 0;
        listingPrice = 0.0025 ether;
    }

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    MarketItem[] public marketItems;

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function getUnsoldItemCount() public view returns (uint256) {
        return marketItems.length - _itemsSold;
    }

    /* Places an item for sale on the marketplace */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable returns (uint256) {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        uint256 itemId = marketItems.length;

        marketItems.push(
            MarketItem(
                itemId,
                nftContract,
                tokenId,
                payable(msg.sender),
                payable(address(0)),
                price,
                false
            )
        );

        IERC721(nftContract).approve(address(this), tokenId);
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
        return marketItems.length;
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
        address tokenContract,
        address nftContract,
        uint256 itemId
    ) public payable {
        require(
            msg.sender != marketItems[itemId].seller,
            "You cannot buy your own item"
        );
        uint256 price = marketItems[itemId].price;
        uint256 tokenId = marketItems[itemId].tokenId;

        uint256 balance = AztecToken(tokenContract).balanceOf(msg.sender);
        require(
            balance >= price,
            "Please submit asking price in order to complete the purchase"
        );

        uint256 allowance = AztecToken(tokenContract).allowance(
            msg.sender,
            address(this)
        );
        require(
            allowance >= price,
            "Please approve asking price in order to complete the purchase"
        );

        // transfer aztect token from buyer to seller
        AztecToken(tokenContract).transferFrom(
            msg.sender,
            marketItems[itemId].seller,
            marketItems[itemId].price
        );

        // marketItems[itemId].seller.transfer(msg.value);
        // tranfer ownership from this contract to buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        marketItems[itemId].owner = payable(msg.sender);
        marketItems[itemId].sold = true;
        _itemsSold += 1;
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 unsoldItemCount = marketItems.length - _itemsSold;
        uint256 counter = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < marketItems.length; i++) {
            if (
                marketItems[i].owner == payable(address(0)) &&
                marketItems[i].seller != address(0)
            ) {
                items[counter] = marketItems[i];
                counter++;
            }
        }
        return items;
    }

    /* Returns only items a user has created */
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 itemCount = 0;
        uint256 counter = 0;

        for (uint256 i = 0; i < marketItems.length; i++) {
            if (marketItems[i].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < marketItems.length; i++) {
            if (marketItems[i].seller == msg.sender) {
                items[counter] = marketItems[i];
                counter++;
            }
        }
        return items;
    }
}
