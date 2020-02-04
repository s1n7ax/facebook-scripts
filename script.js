// properties
let url = "https://www.facebook.com/friends/requests/?fcref=ft&outgoing=1"

let btn_SeeMoreRequests = "//a[text()='See More Requests']"
let btn_FriendRequestSent = "//button[text()='Friend Request Sent' and not(contains(@class, 'hidden_elem'))]"
let btn_CancelRequest = "//a//span[text()='Cancel Request']/.."


// functions
const findElement = (xpath) => {
	const element = document.evaluate(xpath, document).iterateNext();
	if(!element) throw new Error(`unable to locate element with xpath:: ${xpath}`);

	return element
}

const findElements = (xpath) => {
	let elements = []
	while(ele = a.iterateNext()){
		elements.push(ele)
	}

	return ele;
}

const seeMoreRequests = async () => {
	console.log('>>> clicking on see more')
	findElement(btn_SeeMoreRequests).click()
	await wait(5)
	console.log('>>> clicking on see more - successful')
}

const removeSentRequest = async () => {
	console.log('>>> removing sent request')
	findElement(btn_FriendRequestSent).click()
	await wait(1)
	findElement(btn_CancelRequest).click()
	console.log('>>> removing sent request - successful')
}

const wait = (seconds) => {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, seconds * 1000)
	})
}

let retry = false;

const main = async () => {
	try {
		while(true) {
			await removeSentRequest();
			retry = false;
			await wait(6)
		}
	} catch(error) {
		if(retry) {
			console.log("### end of the automation")
			return
		}

		console.error(error)
		await seeMoreRequests();

		retry = true;

	await main();
	}
}

main();
