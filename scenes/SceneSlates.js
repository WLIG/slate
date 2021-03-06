import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Section from "~/components/core/Section";

const STYLES_NUMBER = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
`;

// TODO(jim): Slates design.
export default class SceneSlates extends React.Component {
  render() {
    // TODO(jim): Refactor later.
    const slates = {
      columns: [
        {
          key: "slatename",
          name: "Slate Name",
          width: "100%",
          type: "SLATE_LINK",
        },
        { key: "url", name: "URL", width: "268px", type: "NEW_WINDOW" },
        { key: "id", id: "id", name: "Slate ID", width: "296px" },
        {
          key: "objects",
          name: "Objects",
        },
        {
          key: "public",
          name: "Public",
          type: "SLATE_PUBLIC_TEXT_TAG",
          width: "188px",
        },
      ],
      rows: this.props.viewer.slates.map((each) => {
        return {
          ...each,
          url: `https://slate.host/${this.props.viewer.username}/${each.slatename}`,
          public: each.data.public,
          objects: <span css={STYLES_NUMBER}>{each.data.objects.length}</span>,
        };
      }),
    };

    // TODO(jim): Refactor later.
    const slateButtons = [{ name: "Create slate", type: "SIDEBAR", value: "SIDEBAR_CREATE_SLATE" }];

    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Will the Slates page look like this in the final product?"
          description="No! Consider this page just a functionality test. Slates will be collaborative mood boards and will have a much more intuitive experience than this."
        />
        <System.H1 style={{ marginTop: 48 }}>Slates</System.H1>
        <Section title="Slates" buttons={slateButtons} onAction={this.props.onAction}>
          <System.Table
            data={slates}
            name="slate"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>
      </ScenePage>
    );
  }
}
