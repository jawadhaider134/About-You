import PromoBanner from "./PromoBanner";
import LanguageSelector from "./LanguageSelector";
import MainHeader from "./MainHeader";
import CategoryNav from "./CategoryNav";
import TopBanner from "./TopBanner";
export default function Header(){
    return (
        <>
            <PromoBanner initialTime={3600} />
                  <LanguageSelector />
                  <MainHeader />
                  <CategoryNav />
                  <TopBanner />
        </>
    )
}