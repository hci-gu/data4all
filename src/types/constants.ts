export enum FeedFilter {
    Tagged = 'När jag blivit taggad',
    MyDatasets = 'Mina dataset',
    All = 'Alla händelser',
}
export const descriptionForFeedFilter = (filter: FeedFilter) => {
    switch (filter) {
        case FeedFilter.Tagged:
            return 'Se händelser där du eller din roll är taggad eller när något hänt i dataset du kommenterat.'
        case FeedFilter.MyDatasets:
            return 'Se bara händelser i dina egna dataset'
        case FeedFilter.All:
            return 'Se senaste kommentarer och händelser i alla dataset'
    }
}
