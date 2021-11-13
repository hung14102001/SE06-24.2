# Solidity

## •	Versioning: 
Một trong những điều đầu tiên mà ta phải làm khi viết bất cứ chương trình solidity nào là xác định phiên bản solidity mà ta sử dụng. Đây là thông tin mà compiler cần để dịch chương trình
Luôn luôn đặt ở đầu chương trình, xác định bằng từ khóa pragma solidity, theo sau là phiên bản solidity sử dụng.
Vd: ```pragma solidity >=0.6.0<0.9.0;```
## •	Compiling: 
- Remix!
Sử dụng tổ hợp phím Ctrl + S (hoặc cmd + S) để lưu và biên dịch chương trình hoặc ấn trực tiếp nút Compile trên thanh Solidity Compiler
  + Compiler sẽ tự động thay đổi phiên bản Solidity phù hợp với chương trình.
     Lỗi: Nếu ta cố gắng thay đổi phiên bản compiler không phù hợp => ParseError
## •	Contract Declaration:
Từ khóa contract để khai báo một smart contract, sau đó là tên contract (do người dùng đặt), và cặp ngoặc nhọn ({}). Bên trong cặp {} là nội dung của bản hợp đồng .
Vd về một sm đơn giản: 
```Solidity
contract SimpleStorage {
    // content here ...
}
```
## •	Types & Declaring Variables: 
- Solidity là một ngôn ngữ kiểu tĩnh, có nghĩa là kiểu của mỗi biến (trạng thái và cục bộ) cần được xác định trước khi sử dụng.
Một số kiểu dữ liệu cơ bản của Solidity: 
```unit256```: số nguyên không dấu, kích cỡ 256 bit, hay có cách viết khác là unit, từ 0-> 2^32-1.
```int256```: giống vs ```uint256```, tuy nhiên có thể là số âm hoặc dương.
```bool: true | false.```
```address:``` chứa một giá trị 20byte (thường là một số loại địa chỉ ethereum).
```string:``` một xâu văn bản, có thể là một từ, một câu, một tổ hợp ký tự bất kỳ.
```byte32:``` đối tượng byte kích cỡ 32 byte, gồm 32 byte nối tiếp nhau.
Tương tự với byte1, byte2… tuy nhiên chỉ tối đa là 32.
- Khỏi tạo, gán giá trị một biến:
Vd: ```uint256 number = 5;```
## •	Default Initializations: 
Nếu ta khai báo một biến mà không gán trị cho nó, nó sẽ tự động gán một gtri mặc định tuỳ theo kiểu của nó.
Vd: ```unit256 number;```
Ở đây number sẽ bằng 0. Có nghĩa là khi ta triển khai một hợp đồng có biến number chưa được gán giá trị như trên, number sẽ bắt đầu = 0.
Một số gtri khởi tạo mặc định: 
```Solidity
boolean: false;
string: "";
int: 0;
uint: 0;
address: 0x0;
```
 
## •	COMMENT : 
Cũng giống như các ngôn ngữ lập trình khác, Solidity hỗ trợ cả nhận xét trong một dòng và nhiều dòng
-	Bắt đầu dòng với “ // “ để bao gồm nhận xét trong một dòng.
```Solidity
//Nhận xét một dòng
```
-	Bắt đầu bằng “ /* “ và kết thúc bằng “ */ “ để bao gồm nhận xét trong nhiều dòng .
```Solidity
/*Nhận xét
nhiều dòng*/
```

## •	FUNCTION : 
Hàm là một nhóm mã có thể sử dụng lại , có thể được gọi ở bất cứ đâu trong chương trình của bạn . Điều này giúp loại bỏ nhu cầu viết đi viết lại của đoạn mã . Nó giúp các lập trình viên viết mã mo-dun. Các hàm cho phép người lập trình chia một chương trình lớn thành một hàm nhỏ và có thể quản lý được .
Giống như bất kỳ ngôn ngữ nâng cao nào khác , Solidity cũng hỗ trợ tất cả các tính năng cần thiết để viết mã mo – dun bằng các hàm 

## •	DEPLOYING A CONTRACT :
1.	Thiết lập Truffle npm install-g truffle ...
2.	Tạo hợp đồng của bạn ...
3.	Triển khai hợp đồng của bạn ...
4.	Định cấu hình mạng Kovan và nhà cung cấp ...
5.	Truy cập hợp đồng đã triển khai của bạn ...
6.	Cuối cùng là gọi hàm hợp đồng và nói xin chào 
## •	VISIBILITY : 
Khả năng hiển thị của một hàm xác định tập con nào trong số những người gọi này có thể thực thi một cách hợp pháp
Các kiểu hiển thị chức năng :
Khả năng hiển thị của chức năng hợp đồng thông minh được chỉ định bằng cách sử dụng một trong bốn từ khóa hiển thị ( riêng tư , nội bộ , bên ngoài hoặc công khai ) và được đặt ngay sau danh sách tham số chức năng.
* ### Private : 
Một chức năng riêng tư là một chức năng có thể được gọi bởi chính hợp đồng chính . Mặc dù đây không phải là mặc định , nhưng thông lệ tốt là giữ các chức năng của bạn ở chế độ riêng tư trừ khi cần một phạm vi có khả năng hiển thị nhiều hơn .

* ### Internal : 
Một chức năng nội bộ có thể được gọi bởi chính hợp đồng chính , cộng với bất kỳ hợp đồng dẫn xuất nào . Đối với các chức năng riêng tư , thông thường , bạn nên giứ các chức năng của mình bên trong bất cứ khi nào có thể. 
* ### External : 
Một chức năng bên ngoài chỉ có thể được gọi từ bên thứ ba . Nó không thể được gọi từ chính hợp đồng chính hoặc bất cứ hợp đồng nào không bắt nguồn từ nó . 
Các hàm bên ngoài có lợi ích là chúng hoạt động tốt hơn do thực tế là các đối số của chúng không cần sao chép vào bộ nhớ. 

* ### Public : 
Một hàm công cộng có thể được gọi từ tất cả các bên tiềm năng . Trừ khi chúng được chỉ định khác , tất cả các chức năng được đặt ở chế độ công khai theo mặc định .
## •	Scope
Phạm vi của các biến cục bộ được giới hạn trong hàm mà chúng được định nghĩa nhưng phạm vi biến trạng thái (State variables) có thể chia ra làm 3 loại:
- Public: các biến ở trạng thái Public có thể được truy cập nội bộ cũng như thông qua tin nhắn. đối với các biến public, một hàm getter được tạo tự động.
-	 Internal: các biến Internal chỉ có thể được truy cập nội bộ từ hợp động hiện tại hoặc các hợp đồng có nguồn gốc từ nó mà không đang không sử dụng.
-	Private: các biến private chỉ có thể được truy cập nội bộ từ hợp đồng hiện tại được định nghĩa không phải trong hợp đồng dẫn xuất từ đó.

## •	View & Pure Functions

 View funtions đảm bảo rằng chúng sẽ không sửa đổi trạng thái. Một hàm có thể được khai báo chỉ xem. Các câu lệnh if lúc đó trong hàm được coi là sửa đổi trạng thái và trình biên dịch sẽ đưa ra cảnh báo.
*	Sửa đổi ác biến trạng thái.
*	 Phát ra các sự kiện
*	Tạo các hợp đồng khác.
*	Sử dụng “tự huỷ”. (Opcode này sẽ remove contract ra khỏi blockchain).
*	Gửi Ether qua các cuộc gọi.
*	Gọi bất kì hàm nào không được đánh đấu là chế độ xem hoặc thuần tuý.
*	Sử dụng các cuộc gọi tầm thấp
*	Sử dụng trình biên dịch mã nội tuyến những toán hạng nhất định.

#### Pure functions đảm bảo rằng chúng không đọc hoặc sửa đổi trạng thái. Một hàm có thể được khai báo thuần tuý. Các câu lệnh ij trong hàm được coi là đang đọc trạng thái và trình biên dịch sẽ đưa ra cảnh báo.
*	Đọc biến trạng thái.
*	Accessing address(this).balance hoặc <address>.balance.
*	Truy cập đến bất kì biến đặc biệt nào của khối, tx, msg (msg.sig và msg.data đều có thể được đọc).
*	Gọi bất kì hàm nào không được đánh dấu là thuần tuý.
*	Sử dụng trình biên dịch mã nội tuyến những toán hạng nhất định.
Các hàm thuần túy có thể sử dụng các hàm revert () và request () để hoàn nguyên các thay đổi trạng thái tiềm ẩn nếu có lỗi xảy ra.
## •	Structs
 Các kiểu cấu trúc được sử dụng để biểu diễn một abnr ghi. Giả sử bạn muốn theo dõi sách của mình trong thư biện. Bạn có muốn theo dõi các thuộc tính của từng cuốn sách như sau:
*	Title
*	Author
*	Subject
*	Book ID
#### Định nghĩa Structs
Để định nghĩa một cấu trúc, bạn cần sử dụng từ khoá’’struct”. Từ khoá này định nghĩa một kiểu dữ kiệu mới với hơn một thành viên. Định dạng của câu lệnh struct như sau:
```Solidity
struct struct_name { 
   type1 type_name_1;
   type2 type_name_2;
   type3 type_name_3;
}
Ví dụ:
struct Book { 
   string title;
   string author;
   uint book_id;
}
```
Kết nột một cấu trúc và biến của nó
Để truy cập vào mất kì thành viên nào của một cấu trúc, chúng ta sử dụng member access operator (.). member access operator được mã hoá dưới dạng dấu chấm giữa các tên biến cấu trúc và thanh viên cấu trúc mà chúng ra muốn tuy cập. Bạn sử dụng struct để định nghĩa biến của kiểu cấu trúc. Ví dụ sau đây cho thấy cách sử dụng một cấu trúc trong một chương trình.
Ví dụ:
Hãy thử đoạn code sau để hiẻu cách struct hoạt động trong solidity
```Solidity
pragma solidity ^0.5.0;

contract test {
   struct Book { 
      string title;
      string author;
      uint book_id;
   }
   Book book;

   function setBook() public {
      book = Book('Learn Java', 'TP', 1);
   }
   function getBookId() public view returns (uint) {
      return book.book_id;
   }
}
```
Run the above program using steps provided in Solidity First Application chapter.

Đầu tiên Nhấp vào Nút setBook để đặt giá trị là LARGE sau đó nhấp vào getBookId để lấy id sách đã chọn.

Output
```uint256: 1```

## •	Intro to Storage
Các từ khóa Storage và Memory trong Solidity tương tự như ổ cứng của Máy tính và RAM của Máy tính. Giống như RAM, Bộ nhớ trong Solidity là nơi tạm thời để lưu trữ dữ liệu trong khi Bộ nhớ lưu giữ dữ liệu giữa các lệnh gọi hàm. Hợp đồng thông minh Solidity có thể sử dụng bất kỳ dung lượng bộ nhớ nào trong quá trình thực thi nhưng khi quá trình thực thi dừng lại, Bộ nhớ sẽ bị xóa hoàn toàn cho lần thực thi tiếp theo. Trong khi Mặt khác, Bộ nhớ là liên tục, mỗi lần thực thi Hợp đồng thông minh đều có quyền truy cập vào dữ liệu đã được lưu trữ trước đó trên vùng lưu trữ.

Mỗi giao dịch trên Máy ảo Ethereum đều khiến chúng tôi tốn một lượng Gas. Mức tiêu thụ Gas càng thấp thì mã Solidity của bạn càng tốt. Mức tiêu thụ khí của Bộ nhớ không đáng kể so với mức tiêu thụ khí của Bộ nhớ. Do đó, tốt hơn hết là sử dụng Bộ nhớ cho các phép tính trung gian và lưu trữ kết quả cuối cùng trong Bộ nhớ.

Biến trạng thái và Biến cục bộ của cấu trúc, mảng luôn được lưu trong kho lưu trữ theo mặc định.
Các đối số của hàm nằm trong bộ nhớ.
Bất cứ khi nào một phiên bản mới của mảng được tạo bằng từ khóa ‘memory’, một bản sao mới của biến đó sẽ được tạo. Thay đổi giá trị mảng của phiên bản mới không ảnh hưởng đến mảng ban đầu.
## •	Array – Dynamic & Fixed sized
Fixed-sized array(mảng với số lượng phần tử cố định): bytesI (với 0 < I <= 32): alias for byte[I], <type>[]

Dynamic-sized array(mạng động không cố định số lượng phần tử): string, bytes, <type>[]
## •	Compile Error and Warning:
Có red box sau khi compile là đã gặp phải compile error, lỗi code hoặc lỗi cú pháp solidity.

Có yellow chỉ là warning vẫn có thể compile và có thể có một số tips hữu dụng về code để tránh các lỗi sai.
## •	Memory:
Trong Solidity, có 2 chỗ lưu variable: trong storage hoặc trong memory. Một variable lưu trên memory chỉ là tạm thời, nó còn khi function được dùng đến, sau đó sẽ bị xoá. Một variable lưu trên storage thì ở đó vĩnh viễn. Bạn cũng không cần phải lo lắng về việc variable được lưu ở đâu, vì Solidity sẽ xử lý nó giúp bạn. Ví dụ như, các state variable (maxAge, minAge, Developer), được khai báo ngoài function thì sẽ lưu trên storage. Các variables như randId, id, rand được store trên memory. Tuy nhiên, trong một số trường hợp, bạn muốn cần chi tiết chỗ lưu một variable nhất định. Solidity sẽ show cho bạn bằng keyword memory và storage.
## •	Mappings:
Mappings là một cách khác để lưu trữ dữ liệu có tổ chức trong Solidity.
Ví dụ:
Trong ứng dụng quản lí tài chính, lưu trữ 1 số tài khoản của người dùng:

```mapping (address => uint) public accountBalance;```

Có thể dùng để tra cứu tên người dùng từ tài khoản

```mapping (uint => string) userIdToName;```

Mappings là một kho lưu trữ giá trị chính để lưu trữ và tìm kiếm dữ liệu. Trong ví dụ đầu tiên, khóa là address và giá trị là một uint, và trong ví dụ thứ hai, khoá là một uint và giá trị là string.
## •	SPDX License:
Niềm tin vào hợp đồng thông minh có thể được thiết lập tốt hơn nếu mã nguồn của chúng có sẵn.
 Vì việc cung cấp mã nguồn luôn có liên quan đến các vấn đề pháp lý liên quan đến bản quyền, trình biên dịch Solidity khuyến khích sử dụng các mã nhận dạng giấy phép SPDX có thể đọc được bằng máy. 
Mọi tệp nguồn phải bắt đầu bằng nhận xét cho biết giấy phép của nó với cú pháp:

```// SPDX-License-Identifier: MIT```

## •	Deploy Smart Contract lên một blockchain
Sau khi có được smart contract hoàn chỉnh rồi, việc cần làm tiếp theo là deploy contract đó lên một blockchain.
*	Bước đầu là chọn blockchain là mainet hay testnet hoặc có thể là localhost.
*	Kết nối với tài khoản thông qua ví điện tử metamask hoặc các ví khác tương tự, việc này yêu cầu ví phải có tiền do deploy contract sẽ thu phí gas.

Tương tác với các contract đã deployed có thể thông qua dapp, trong Remix thì có sẵn giao diện tương tác sau khi deploy. Mỗi khi tương tác với một hàm k có modifier là view hoặc pure sẽ tạo ra 1 transaction (tất nhiên yêu cầu trả phí gas). Biến khai báo với từ khóa public sẽ tự động tạo ra hàm getter mang từ khóa view.
## •	The EVM
 Ethereum Virtual Machine là một công cụ tính toán hoạt động giống như một máy tính phi tập trung có hàng triệu dự án có thể thực thi.
* Nó hoạt động như một máy ảo, nền tảng của toàn bộ cấu trúc hoạt động của Ethereum.
* Được coi là một phần của Ethereum chạy quá trình thực thi và triển khai Smart Contract.
* Vai trò của EVM là triển khai một số chức năng bổ sung cho Blockchain để đảm bảo người dùng đối mặt với các vấn đề hạn chế trên sổ cái phân tán.
* Mọi nút Ethereum đều chạy trên EVM để duy trì sự đồng thuận trên blockchain.
* EVM hoàn toàn bị cô lập có nghĩa là mã bên trong EVM không có quyền truy cập vào mạng, hệ thống tệp hoặc các quy trình khác.
* Ethereum có hai loại tài khoản: Tài khoản được sở hữu bên ngoài (EOA) và * Tài khoản hợp đồng, cả hai đều được đối xử bình đẳng theo EVM.
* Việc tóm tắt tài khoản cố gắng giảm điều này xuống chỉ còn một tài khoản có nghĩa là cả EOA và Tài khoản hợp đồng đều hoạt động như nhau.
* EOA được kiểm soát bởi khóa riêng, trong khi tài khoản hợp đồng được lưu trữ trong hợp đồng thông minh, còn được gọi là ví thông minh.

 Hầu hết mã nguồn để sử dụng hợp đồng thông minh được thực hiện bằng ngôn ngữ lập trình từ Solidity. Sau đó, nó được chuyển đổi thành các mã quang để EVM thông dịch. Sau đó, EVM sử dụng các mã hoạt động để hoàn thành một số tác vụ nhất định. Vì vậy, EVM hoạt động giống như một máy tính chủ hoặc phân quyền lớn để hoàn thành tất cả các loại nhiệm vụ trên blockchain.

