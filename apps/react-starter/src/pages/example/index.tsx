/*
 * SPDX-FileCopyrightText: 2023 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  IxCol,
  IxIcon,
  IxIconButton,
  IxInputGroup,
  IxLayoutGrid,
  IxRow,
  IxTabItem,
  IxTabs,
} from '@siemens/ix-react';
import PageHeader from '../../components/page-header';

import styles from './styles.module.css';
import { useState } from 'react';
import DataGrid from './data-grid';
import List from './list';
import { MockData } from './mock-data';
import { EntryDetail } from './detail';

function IconTab(props: { name: string; icon: string }) {
  return (
    <div className={styles.IconTab}>
      <IxIcon name={props.icon}></IxIcon>
      {props.name}
    </div>
  );
}

function Search(props: { onCollapse: () => void }) {
  return (
    <div className={styles.Search}>
      <IxInputGroup>
        <IxIcon name="filter" size="16" slot="input-start"></IxIcon>
        <input />
      </IxInputGroup>
      <IxIconButton
        icon="navigation-right"
        onClick={props.onCollapse}
      ></IxIconButton>
    </div>
  );
}

export default () => {
  const [selectedEntry, setSelectedEntry] = useState<MockData | null>(null);
  const [tab, setTab] = useState<'data-grid' | 'list'>('data-grid');

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.Example}>
      <PageHeader header="Time series data" />
      <IxTabs>
        <IxTabItem onClick={() => setTab('data-grid')}>
          <IconTab name="Data grid" icon="table" />
        </IxTabItem>
        <IxTabItem onClick={() => setTab('list')}>
          <IconTab name="List" icon="list" />
        </IxTabItem>
      </IxTabs>
      <IxLayoutGrid className={styles.Layout}>
        <IxRow className={styles.Row}>
          <IxCol size={collapsed ? `12` : `7`} className={styles.Col}>
            <Search onCollapse={onCollapse} />
            {tab === 'data-grid' && (
              <DataGrid
                selected={selectedEntry}
                onSelectionChange={setSelectedEntry}
              ></DataGrid>
            )}
            {tab === 'list' && (
              <List
                selected={selectedEntry}
                onSelectionChange={setSelectedEntry}
              ></List>
            )}
          </IxCol>
          {!collapsed && (
            <IxCol size="5" className={styles.Col}>
              <EntryDetail entry={selectedEntry} />
            </IxCol>
          )}
        </IxRow>
      </IxLayoutGrid>
    </div>
  );
};
