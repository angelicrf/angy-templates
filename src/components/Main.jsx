import { useState, useEffect } from "react";
export const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [textResult, setTextResult] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    setIsClicked(true);
    console.log(textValue);
  };
  useEffect(() => {
    const postRequest = async (thisText) => {
      setTextResult("");
      let requestBody = JSON.stringify([{ Text: thisText }]);
      const postResponse = await fetch(
        "https://angytemplates.cognitiveservices.azure.com/translator/text/v3.0/translate?to=fr",
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": "194fa94e30ef4035a0cefd2d31815c79",
            "Ocp-Apim-Subscription-Region": "westus2",
            "Content-Type": "application/json",
          },
          body: requestBody,
        }
      );
      console.log(postResponse.status);
      if (postResponse.status == 200) {
        const jsonResult = await postResponse.json();
        console.log(jsonResult[0].translations[0].text);
        setTextResult(jsonResult[0].translations[0].text);
        setTextValue("");
        setIsClicked(false);
      }
    };
    if (isclicked) {
      postRequest(textValue);
    }
  }, [isclicked]);
  return (
    <div className="mx-4" style={{ marginTop: "100px" }}>
      <p className="text-1xl font-bold">My App!</p>
      <form onSubmit={submitForm}>
        <div class="mb-6">
          <label class="block mb-2 mt-3 text-md font-medium">My Text</label>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="My text"
          />
          <button className="bg-blue-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
      </form>
      <div>{textResult && textResult}</div>
    </div>
  );
};
