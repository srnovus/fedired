//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.0

use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
#[sea_orm(table_name = "access_token")]
#[macros::export(object, js_name = "AccessToken")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    #[sea_orm(column_name = "createdAt")]
    pub created_at: DateTimeWithTimeZone,
    pub token: String,
    pub hash: String,
    #[sea_orm(column_name = "userId")]
    pub user_id: Option<String>,
    #[sea_orm(column_name = "appId")]
    pub app_id: Option<String>,
    #[sea_orm(column_name = "lastUsedAt")]
    pub last_used_at: Option<DateTimeWithTimeZone>,
    pub session: Option<String>,
    pub name: Option<String>,
    pub description: Option<String>,
    #[sea_orm(column_name = "iconUrl")]
    pub icon_url: Option<String>,
    pub permission: Vec<String>,
    pub fetched: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::app::Entity",
        from = "Column::AppId",
        to = "super::app::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    App,
    #[sea_orm(has_many = "super::notification::Entity")]
    Notification,
    #[sea_orm(has_many = "super::sw_subscription::Entity")]
    SwSubscription,
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    User,
}

impl Related<super::app::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::App.def()
    }
}

impl Related<super::notification::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Notification.def()
    }
}

impl Related<super::sw_subscription::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::SwSubscription.def()
    }
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
