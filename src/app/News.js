import { HeaderImage } from "./HeaderImage";
import NewsInput from "./NewsInput";
import { FIRESTORE_DB } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const News = (props) => {
  const GetDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return date + "/" + month + "/" + year;
  };

  const saveNews = async (headline, content) => {
    const news = {
      creator: props.user.displayName,
      headLine: headline,
      newsContent: content,
      date: GetDate(),
    };
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "News"), news);
      alert("Nyhet tillagd");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <HeaderImage />
      <NewsInput saveNews={saveNews} />
    </div>
  );
};
export default News;
