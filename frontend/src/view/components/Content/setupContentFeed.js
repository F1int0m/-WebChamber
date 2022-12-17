import config from './config.json'
import {PROFILE_PAGE} from "../../../system/env";

export default function setupContentFeed (pageType) {
    try {
        let enableAddContentButton;
        // let viewType;
        // let postType;

        if (pageType === 'casual-chamber') {
            enableAddContentButton = config.showButtons.addContent.Chamber_CasualPostsPage
        } else if (pageType === 'challenges-chamber') {
            enableAddContentButton = config.showButtons.addContent.Chamber_ChallengesListPage
        } else if (pageType === 'challenge') {
            enableAddContentButton = config.showButtons.addContent.Chamber_ChallengePage
        } else if (pageType === PROFILE_PAGE.CASUAL.TYPE.NOT_ME) {
            enableAddContentButton = config.showButtons.addContent.Profile_CasualPostsPage
        } else if (pageType === PROFILE_PAGE.CASUAL.TYPE.ME) {
            enableAddContentButton = config.showButtons.addContent.Profile_me_CasualPostsPage
        } else if (pageType === PROFILE_PAGE.CHALLENGES.TYPE) {
            enableAddContentButton = config.showButtons.addContent.Profile_ChallengesPostsPage
        } else if (pageType === 'casual-favourites') {
            enableAddContentButton = config.showButtons.addContent.Favourites_AllPostsPage
        } else if (pageType === 'challenges-favourites') {
            enableAddContentButton = config.showButtons.addContent.Favourites_ChallengesListPage
        }
        else {
            throw new Error('setupContentFeed: there is no type of page like ' + pageType);
        }

        return {
            showButtons: {
                addContent: enableAddContentButton
            }
        }
    } catch (e) {
        console.error(e);
    }
}