export default function HelloWorld(){
     const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
        
    }
    return (
        <div className="card">
            
            <h1>Hello World</h1>
             <img src="img/img.png" alt="logo" />
            <p>Selamat Belajar ReactJs</p>
           
            <GreetingBinjai/>
            <UserCard 
	            nama="Nabil" 
	            nim="2457301102"
	            tanggal={new Date().toLocaleDateString()}
	          />
            <UserCard 
	            nama="Amba" 
	            nim="24573011"
	            tanggal={new Date().toLocaleDateString()}
	          />
            <UserCard {...propsUserCard}/>
            <QuoteText/>
        </div>
    )
}

function GreetingBinjai(){
    return(
        <small>Salam Dari Binjai😎😎</small>
    )
}

function UserCard(props){
    return (
        <div className="card">
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div className="card">
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}