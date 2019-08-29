from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class IsOwnerOrReject(permissions.BasePermission):
    """
    Custom permission to only_allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Write permissions are only allowed to the owner of the snippet
        if hasattr(obj, 'author'):
            return obj.author == request.user
        elif hasattr(obj, 'uid'):
            return obj.uid == request.user
        elif hasattr(obj, 'user'):
            return obj.user == request.user
        return False




class IsAdminUserOrReadOnly(permissions.BasePermission):
    """"
    The request is superuser, or is a read-only request.
    """

    def has_permission(self, request, view):
        return (request.method in SAFE_METHODS or
                request.user and
                request.user.is_staff
                )
