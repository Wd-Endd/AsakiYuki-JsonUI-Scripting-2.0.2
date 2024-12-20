"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VanillaPaths = void 0;
exports.VanillaPaths = ["ui/achievement_screen.json", "ui/add_external_server_screen.json", "ui/adhoc_inprogess_screen.json", "ui/adhoc_screen.json", "ui/anvil_screen.json", "ui/anvil_screen_pocket.json", "ui/authentication_modals.json", "ui/authentication_screen.json", "ui/auto_save_info_screen.json", "ui/beacon_screen.json", "ui/beacon_screen_pocket.json", "ui/blast_furnace_screen.json", "ui/book_screen.json", "ui/brewing_stand_screen.json", "ui/brewing_stand_screen_pocket.json", "ui/bundle_purchase_warning_screen.json", "ui/cartography_screen.json", "ui/cartography_screen_pocket.json", "ui/chalkboard_screen.json", "ui/chat_screen.json", "ui/chat_settings_menu_screen.json", "ui/chest_screen.json", "ui/choose_realm_screen.json", "ui/cloud_upload_screen.json", "ui/coin_purchase_screen.json", "ui/command_block_screen.json", "ui/comment_screen.json", "ui/confirm_delete_account_screen.json", "ui/confirm_msa_unlink_screen.json", "ui/content_log.json", "ui/content_log_history_screen.json", "ui/convert_purchases_to_xbl_screen.json", "ui/crafter_screen_pocket.json", "ui/create_world_upsell_screen.json", "ui/credits_screen.json", "ui/csb_purchase_error_screen.json", "ui/csb_screen.json", "ui/csb_sections/content_section.json", "ui/csb_sections/csb_banner.json", "ui/csb_sections/csb_buy_now_screen.json", "ui/csb_sections/csb_common.json", "ui/csb_sections/csb_purchase_amazondevicewarning_screen.json", "ui/csb_sections/csb_purchase_warning_screen.json", "ui/csb_sections/csb_subscription_panel.json", "ui/csb_sections/csb_upsell_dialog.json", "ui/csb_sections/csb_view_packs_screen.json", "ui/csb_sections/csb_welcome_screen.json", "ui/csb_sections/faq_section.json", "ui/csb_sections/landing_section.json", "ui/custom_templates_screen.json", "ui/day_one_experience_intro_screen.json", "ui/day_one_experience_screen.json", "ui/death_screen.json", "ui/debug_screen.json", "ui/dev_console_screen.json", "ui/disconnect_screen.json", "ui/display_logged_error_screen.json", "ui/edu_discovery_dialog.json", "ui/edu_pause_screen_pause_button.json", "ui/emote_wheel_screen.json", "ui/enchanting_screen.json", "ui/enchanting_screen_pocket.json", "ui/encyclopedia_screen.json", "ui/expanded_skin_pack_screen.json", "ui/feed_common.json", "ui/feed_screen.json", "ui/file_upload_screen.json", "ui/furnace_screen.json", "ui/furnace_screen_pocket.json", "ui/gamepad_disconnected.json", "ui/gamepad_layout_screen.json", "ui/game_tip_screen.json", "ui/gathering_info_screen.json", "ui/global_pause_screen.json", "ui/grindstone_screen.json", "ui/grindstone_screen_pocket.json", "ui/hdr_calibration_screen.json", "ui/holographic_postrender_screen.json", "ui/horse_screen.json", "ui/horse_screen_pocket.json", "ui/host_options_screen.json", "ui/how_to_play_common.json", "ui/how_to_play_screen.json", "ui/hud_screen.json", "ui/immersive_reader.json", "ui/inventory_screen.json", "ui/inventory_screen_pocket.json", "ui/invite_screen.json", "ui/in_bed_screen.json", "ui/item_detail_description_screen.json", "ui/jigsaw_editor_screen.json", "ui/late_join_pregame_screen.json", "ui/library_modal_screen.json", "ui/local_world_picker_screen.json", "ui/loom_screen.json", "ui/loom_screen_pocket.json", "ui/manage_feed_screen.json", "ui/manifest_validation_screen.json", "ui/mob_effect_screen.json", "ui/non_xbl_user_management_screen.json", "ui/npc_interact_screen.json", "ui/online_safety_screen.json", "ui/pack_settings_screen.json", "ui/panorama_screen.json", "ui/patch_notes_screen.json", "ui/pause_screen.json", "ui/pdp_screen.json", "ui/pdp_screenshots_section.json", "ui/perf_turtle.json", "ui/permissions_screen.json", "ui/persona_cast_character_screen.json", "ui/persona_common.json", "ui/persona_screen.json", "ui/persona_SDL.json", "ui/play_screen.json", "ui/pocket_containers.json", "ui/popup_dialog.json", "ui/portfolio_screen.json", "ui/post_rating_screen.json", "ui/profile_card.json", "ui/profile_screen.json", "ui/progress_screen.json", "ui/rating_prompt.json", "ui/realmsPlus_screen.json", "ui/realmsPlus_sections/content_section.json", "ui/realmsPlus_sections/faq_section.json", "ui/realmsPlus_sections/landing_section.json", "ui/realmsPlus_sections/realmsPlus_buy_now_screen.json", "ui/realmsPlus_sections/realmsPlus_purchase_warning_screen.json", "ui/realmsPlus_sections/realmsPlus_view_packs_screen.json", "ui/realmsplus_upgrade_notice_screen.json", "ui/realms_allowlist.json", "ui/realms_common.json", "ui/realms_create.json", "ui/realms_pending_invitations.json", "ui/realms_plus_ended_screen.json", "ui/realms_settings_screen.json", "ui/realms_slots_screen.json", "ui/redstone_screen.json", "ui/resource_packs_screen.json", "ui/safe_zone_screen.json", "ui/scoreboards.json", "ui/screenshot_picker_screen.json", "ui/screenshot_screen.json", "ui/server_form.json", "ui/settings_screen.json", "ui/settings_sections/controls_section.json", "ui/settings_sections/general_section.json", "ui/settings_sections/realms_world_section.json", "ui/settings_sections/settings_common.json", "ui/settings_sections/world_section.json", "ui/sidebar_navigation.json", "ui/sign_screen.json", "ui/simple_inprogress_screen.json", "ui/skin_pack_purchase_screen.json", "ui/skin_picker_screen.json", "ui/smithing_table_2_screen.json", "ui/smithing_table_2_screen_pocket.json", "ui/smithing_table_screen.json", "ui/smithing_table_screen_pocket.json", "ui/smoker_screen.json", "ui/start_screen.json", "ui/stonecutter_screen.json", "ui/stonecutter_screen_pocket.json", "ui/storage_management.json", "ui/storage_management_popup.json", "ui/storage_migration_common.json", "ui/storage_migration_generic_screen.json", "ui/store_common.json", "ui/store_data_driven_screen.json", "ui/store_filter_menu_screen.json", "ui/store_inventory_screen.json", "ui/store_item_list_screen.json", "ui/store_promo_timeline_screen.json", "ui/store_sales_item_list_screen.json", "ui/store_search_screen.json", "ui/store_sort_menu_screen.json", "ui/structure_editor_screen.json", "ui/submit_feedback_screen.json", "ui/sync_iaps_to_xbl_screen.json", "ui/tabbed_upsell_screen.json", "ui/test_anims_screen.json", "ui/thanks_for_testing_screen.json", "ui/third_party_store_screen.json", "ui/toast_screen.json", "ui/token_faq_screen.json", "ui/trade_2_screen.json", "ui/trade_2_screen_pocket.json", "ui/trade_screen.json", "ui/trade_screen_pocket.json", "ui/trial_upsell_screen.json", "ui/ugc_viewer_screen.json", "ui/ui_art_assets_common.json", "ui/ui_common.json", "ui/ui_common_classic.json", "ui/ui_edu_common.json", "ui/ui_holo_cursor.json", "ui/ui_purchase_common.json", "ui/ui_template_buttons.json", "ui/ui_template_dialogs.json", "ui/ui_template_tabs.json", "ui/ui_template_toggles.json", "ui/update_dimensions.json", "ui/update_version.json", "ui/win10_trial_conversion_screen.json", "ui/world_conversion_complete_screen.json", "ui/world_recovery_screen.json", "ui/world_templates_screen.json", "ui/xbl_console_qr_signin.json", "ui/xbl_console_signin.json", "ui/xbl_console_signin_succeeded.json", "ui/xbl_friend_finder.json", "ui/xbl_immediate_signin.json", "ui/xbl_optional_signin.json"];
