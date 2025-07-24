from datetime import datetime
from ml_model import get_combined_actual_and_forecasted_trend
from crud import get_current_quantity_from_db


def get_high_risk_stocks_sorted(all_items_usage, threshold_lookup, forecast_days=10, risk_window_days=5):
    high_risk_items = []

    for item_name, usage_history in all_items_usage.items():
        current_quantity = get_current_quantity_from_db(item_name)
        threshold = threshold_lookup.get(item_name, 0)

        trend_data, depletion_date, avg_usage = get_combined_actual_and_forecasted_trend(
            usage_history,
            current_quantity,
            threshold,
            forecast_days
        )

        if depletion_date:
            days_left = (depletion_date - datetime.now().date()).days
            if days_left <= risk_window_days:
                high_risk_items.append({
                    "item_name": item_name,
                    "depletion_date": depletion_date,
                    "days_left": days_left,
                    "avg_usage": avg_usage,
                    "current_stock": current_quantity
                })

    high_risk_items.sort(key=lambda x: x["depletion_date"])

    return high_risk_items
