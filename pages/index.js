import AdvCard from "../components/AdvCard/AdvCard";
import Footer from "../components/Footer/Footer";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import RentPage from "../components/RentPage/RentPage";

const Index = () => {
  return (
    <div>
      <HeaderNav />
      <main>
        <RentPage />
      </main>
      <AdvCard/>
      <Footer/>
    </div>
  );
};
export default Index;
