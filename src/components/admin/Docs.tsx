import Headline from '../Headline'

const Docs = () => {
  return (
    <main>
      <div className='documentation-container'>
        <Headline headline='Så här fungerar det' />
        <section>
          <h2>Sidor</h2>
          <p>Klicka på &quot;Sidor&quot; i menyn för att komma till sidredigeraren.</p>
          <p>För att skapa en ny sida klicka på &quot;Lägg till ny&quot; och för att redigera befintlig sida klicka på raden eller pennan.</p>
          <p>Väl inne på en sida kan du välja sidtyp. Välj sidtypen &quot;Home&quot; om du vill använda sidan som landningssida. Välj sidtypen &quot;Text page&quot; om du vill kunna lägga till text och bild. Rena konstverkssidor skapas från sidan &quot;Kategorier&quot; (se nedan).</p>
          <p>Om du har valt sidtypen &quot;Home&quot; kan du bocka i de kategorier du vill visa på din startsida. Dessa kategorier går även att sortera i önskad ordning.</p>
          <p>Fyll i önskade fält, och klicka sedan på &quot;Uppdatera&quot; eller &quot;Spara&quot;.</p>
          <p>För att radera en sida, klicka på den lilla papperskorgen i listvyn eller knappen &quot;Radera&quot; inne på en sida.</p>
        </section>
        <section>
          <h2>Konstverk</h2>
          <p>Klicka på &quot;Konstverk&quot; i menyn för att komma till konstverksredigeraren.</p>
          <p>För att skapa ett nytt konstverk klicka på &quot;Lägg till ny&quot; och för att redigera befintligt konstverk klicka på raden eller pennan.</p>
          <p>Bocka i de kategorier du vill att ditt konstverk ska synas under.</p>
          <p>Fyll i önskade fält, och klicka sedan på &quot;Uppdatera&quot; eller &quot;Spara&quot;.</p>
          <p>För att radera en sida, klicka på den lilla papperskorgen i listvyn eller knappen &quot;Radera&quot; inne på ett konstverk.</p>
        </section>
        <section>
          <h2>Kategorier</h2>
          <p>Klicka på &quot;Kategorier&quot; i menyn för att komma till kategoriredigeraren.</p>
          <p>Kategorier kan användas som enskilda sidor eller under startsidan.</p>
          <p>För att skapa en ny kategori klicka på &quot;Lägg till ny&quot; och för att redigera befintlig kategori klicka på raden eller pennan.</p>
          <p>Fyll i önskade fält, och klicka sedan på &quot;Uppdatera&quot; eller &quot;Spara&quot;.</p>
          <p>För att radera en sida, klicka på den lilla papperskorgen i listvyn eller knappen &quot;Radera&quot; inne på en kategori.</p>
        </section>
        <section>
          <h2>Meny</h2>
          <p>Klicka på &quot;Meny&quot; i menyn för att komma till menyredigeraren.</p>
          <p>Här kan du lägga till sidor i menyn, ta bort sidor från menyn och ändra ordning på menyn.</p>
          <p>Alla befintliga sidor och kategorier kommer visas. Bocka i de sidor / kategorier du vill ska visas i din meny.</p>
          <p>När du valt en sida / kategori kan du använda pilarna för att ändra ordnin på menyn.</p>
          <p>När du känner dig nöjd, klicka på &quot;Uppdatera&quot;.</p>
        </section>
      </div>
    </main>
  )
}

export default Docs
