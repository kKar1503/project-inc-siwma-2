import AdSpaceSection from '@/components/advertisementsDashboard/adSpaceSection';

const AdvertisementDashboard = () => (
  <div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {/* Navbar placeholder */}
        <div style={{ border: '1px solid red', width: '20%', height: '20%' }}>NAVBAR</div>
      </div>
      <div style={{ flex: 5 }}>
        {/* Data card placeholder */}
        <div style={{ border: '1px solid red', width: '20%', height: '10%' }}>DATA CARD THING</div>
        <AdSpaceSection />
      </div>
      <div style={{ flex: 2 }}>
        {/* Chart placeholder */}
        <div style={{ border: '1px solid red', width: '20%', height: '20%' }}>CHART</div>
        {/* Graph placeholder */}
        <div style={{ border: '1px solid red', width: '20%', height: '20%' }}>GRAPH</div>
      </div>
      <div />
    </div>
  </div>
)

export default AdvertisementDashboard;

