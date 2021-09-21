import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabsProps,
} from '@chakra-ui/react'

interface Props extends Partial<TabsProps> {
  tabData: {
    itemID?: string
    label: React.ReactNode
    content: React.ReactNode
  }[]
}

const EnhancedTabs: React.FC<Props> = ({ tabData, ...other }) => (
  <Tabs {...other}>
    <TabList>
      {tabData.map((tab, index) => (
        <Tab
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          itemID={tab?.itemID} /* id cannot be overriden, use itemID instead */
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {tabData.map((tab, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TabPanel p={4} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
)

export default EnhancedTabs
